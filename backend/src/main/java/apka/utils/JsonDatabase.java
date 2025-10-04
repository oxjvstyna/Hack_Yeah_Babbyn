package apka.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
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
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.StandardCopyOption.ATOMIC_MOVE;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Component
public class JsonDatabase {

    private static final String FILE_NAME = "data.json";
    private final List<User> database;

    public JsonDatabase() {
        database = loadDatabase();
    }

    public final ObjectMapper mapper = new ObjectMapper();

    public void addUser(User user) {
        database.stream().forEach(u -> {
            if (u.userId() == user.userId()) {
                addCountry(u.countries(), user.countries().get(0));
            }
            else {
                database.add(u);
            }
        });
        saveDatabase(this.database);
        System.out.println(loadDatabase());
    }

    private void addCountry(List<Country> currentCountries, Country country) {
        System.out.println(country.name());
        currentCountries.stream().forEach(c -> {
            if (country.name().equals(c.name())) {
                addPlace(c.places(), country.places());
            }
            else {
                currentCountries.add(country);
            }
        });

    }

    private void addPlace(List<Place> currentPlaces, List<Place> place) {
        currentPlaces.addAll(place);
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
