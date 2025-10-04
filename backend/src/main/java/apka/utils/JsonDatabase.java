package apka.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import model.Country;
import model.Place;
import model.User;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import static java.nio.file.StandardCopyOption.ATOMIC_MOVE;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Component
public class JsonDatabase {

    private static final String FILE_NAME = "data.json";
    private final List<User> database;

    public JsonDatabase() {
        mapper.registerModule(new JavaTimeModule());
        database = loadDatabase();
    }

    public final ObjectMapper mapper = new ObjectMapper();

    public void addUser(User user) {
        Optional<User> existing = database.stream()
                .filter(u -> u.userId() == user.userId())
                .findFirst();

        if (existing.isPresent()) {
            mergeUser(existing.get(), user);
        } else {
            database.add(user);
        }

        saveDatabase(this.database);
        System.out.println(loadDatabase());
    }

    public List<Country> getCountriesForUser(int userId) {
        return database.stream()
                .filter(user -> user.userId() == userId)
                .findFirst()
                .map(User::countries)
                .orElse(Collections.emptyList());
    }

    public List<Place> getPlacesForUserPerCountry(int userId, String countryName){
        return getCountriesForUser(userId).stream()
                .filter(country -> Objects.equals(country.name(), countryName))
                .findFirst()
                .map(Country::places)
                .orElse(Collections.emptyList());
    }

    public List<Integer> getFriendsForUser(int userId){
        return database.stream()
                .filter(user -> user.userId() == userId)
                .findFirst()
                .map(User::friends)
                .orElse(Collections.emptyList());
    }

    public double getCountryFunRating(List<Integer> userIds, String countryName) {
        return database.stream()
                .filter(user -> userIds.contains(user.userId()))
                .flatMap(user -> user.countries().stream())
                .filter(c -> c.name().equals(countryName))
                .mapToDouble(Country::funRating)
                .average()
                .orElse(0.0);
    }

    private void mergeUser(User target, User incoming) {
        for (Country incCountry : incoming.countries()) {
            Optional<Country> match = target.countries().stream()
                    .filter(c -> c.name().equals(incCountry.name()))
                    .findFirst();

            if (match.isPresent()) {
                mergePlaces(match.get(), incCountry);
            } else {
                target.countries().add(incCountry);
            }
        }
    }

    private void mergePlaces(Country targetCountry, Country incomingCountry) {
        List<Place> targetPlaces = targetCountry.places();
        targetPlaces.addAll(incomingCountry.places());
    }


    public ArrayList<User> loadDatabase() {
        try {
            InputStream inputStream = new ClassPathResource(FILE_NAME).getInputStream();
            JsonNode root = mapper.readTree(inputStream);
            if (!root.isArray()) {
                throw new IllegalStateException("\"users\" is missing or not an array");
            }
            return new ArrayList<User>(mapper.convertValue(root, new TypeReference<List<User>>() {}));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void saveDatabase(List<User> users) {
        try {
            Path file = new ClassPathResource(FILE_NAME).getFile().toPath();

            mapper.enable(SerializationFeature.INDENT_OUTPUT);

            Path dir = file.getParent() != null ? file.getParent() : Paths.get(".");
            Path tmp = Files.createTempFile(dir, "users-", ".json");

            mapper.writeValue(tmp.toFile(), users);

            try {
                Files.move(tmp, file, REPLACE_EXISTING, ATOMIC_MOVE);
            } catch (AtomicMoveNotSupportedException e) {
                Files.move(tmp, file, REPLACE_EXISTING);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
