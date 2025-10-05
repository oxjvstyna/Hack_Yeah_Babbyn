package apka.service;

import apka.controller.request.PlaceRequest;
import apka.db.Country;
import apka.db.CountryRating;
import apka.db.Place;
import apka.db.User;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryService countryService;
    @Autowired
    private CountryRatingService countryRatingService;
    @Autowired
    private PlaceService placeService;

    public Long saveUser() {
        User saved = userRepository.save(new User());
        return saved.getId();
    }

    @Transactional
    public User addUserCountry(Long userId, String countryName) {
        Country country = countryService.addOrRetrieveCountry(countryName);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        CountryRating countryRating = countryRatingService.addOrRetrieveCountryRating(user, country);
        user.addCountryRating(countryRating);
        return userRepository.save(user);
    }

    @Transactional
    public User addUserPlace(Long userId, PlaceRequest placeRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));

        Country country = countryService.addOrRetrieveCountry(placeRequest.getCountryName());
        countryRatingService.addOrRetrieveCountryRating(user, country);

        Place place = placeService.addPlace(placeRequest);
        if (!user.getPlaceIds().contains(place.getId())) {
            user.getPlaceIds().add(place.getId());
        }

        return userRepository.save(user);
    }
}
