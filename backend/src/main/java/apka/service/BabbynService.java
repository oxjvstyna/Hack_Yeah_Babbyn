package apka.service;

import apka.utils.JsonDatabase;
import lombok.RequiredArgsConstructor;
import model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BabbynService {

    private final JsonDatabase jsonDatabase;

    public void test() {
        System.out.println("test");
    }

    public List<Place> findPlaceParameters(int userId, String countryName, Map<String, String> parameters) {

        return null;
    }
    public Map<Integer, List<PlaceSummary>> getUserAndFriendsPlaces(int userId, String country) {
        List<Integer> users = new ArrayList<>(jsonDatabase.getFriendsForUser(userId));
        users.add(userId);
        return users.stream()
                .collect(Collectors.toMap(
                        user -> user,
                        user -> getUserPlacesSummary(user, country)
                ));
    }

    private List<PlaceSummary> getUserPlacesSummary(int userId, String country) {
        return jsonDatabase.getPlacesForUserPerCountry(userId, country).stream()
                .map(place -> new PlaceSummary(
                        place.name(),
                        place.mainPhoto(),
                        place.id(),
                        place.date()
                ))
                .sorted(Comparator.comparing(
                        PlaceSummary::date,
                        Comparator.nullsFirst(Comparator.naturalOrder())
                ).reversed())
                .toList();
    }

    public void saveUsers(List<User> users) {
        jsonDatabase.addUser(users.get(0));
    }

    public List<String> getCountries(int userId) {
        return jsonDatabase.getCountriesForUser(userId)
                .stream()
                .map(Country::name)
                .toList();
    }
}
