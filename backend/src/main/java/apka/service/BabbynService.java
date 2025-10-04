package apka.service;

import apka.utils.JsonDatabase;
import lombok.RequiredArgsConstructor;
import model.Place;
import model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public void saveUsers(List<User> users) {
        jsonDatabase.addUser(users.get(0));
    }

}
