package apka.service;

import apka.utils.JsonLoader;
import lombok.RequiredArgsConstructor;
import model.Place;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BabbynService {

    private final JsonLoader jsonLoader;

    public void test() {
        System.out.println("test");
    }

    public List<Place> findPlaceParameters(int userId, String countryName, Map<String, String> parameters) {
        System.out.println(jsonLoader.loadDatabase());
        return null;
    }

}
