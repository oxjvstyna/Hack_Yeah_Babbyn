package apka.service;

import apka.utils.JsonDatabase;
import lombok.RequiredArgsConstructor;
import model.Country;
import model.Place;
import model.User;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BabbynService {

    private final JsonDatabase jsonDatabase;

    public void saveUsers(List<User> users) {
        jsonDatabase.addUser(users.get(0));
    }

    public void saveCountry(String country, int userId) {
        jsonDatabase.addCountry(new Country(country, List.of()), userId);
    }

    public List<String> getCountries(int userId) {
        return jsonDatabase.getCountriesForUser(userId)
                .stream()
                .map(Country::name)
                .toList();
    }
}
