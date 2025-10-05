package apka.controller;


import apka.controller.request.PlaceRequest;
import apka.db.User;
import apka.responses.CountrySummary;
import apka.responses.PlaceSummary;
import apka.service.CountryRatingService;
import apka.service.CountryService;
import apka.service.PlacesService;
import apka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PlacesService placesService;

    @Autowired
    private CountryRatingService countryRatingService;

    @Autowired
    private CountryService countryService;

    @PostMapping("")
    public ResponseEntity<Long> newUser() {
        return ResponseEntity.ok(userService.saveUser());
    }

    @PostMapping("/{userId}/country")
    public ResponseEntity<User> saveCountry(@PathVariable("userId") Long userId, @RequestParam String countryName) {
        return ResponseEntity.ok(userService.addUserCountry(userId, countryName));
    }

    @PostMapping("/{userId}/place")
    public ResponseEntity<User> savePlace(@PathVariable("userId") Long userId, @RequestBody PlaceRequest placeRequest) {
        return ResponseEntity.ok(userService.addUserPlace(userId, placeRequest));
    }

    @GetMapping("/{userId}/countries/")
    public List<String> getCountries(@PathVariable("userId") Long userId) {
        return countryRatingService.getCountriesIsos(userId);
    }

    @GetMapping("/places/{userId}")
    public CountrySummary getUserAndFriendsPlacesByCountry(
            @PathVariable Long userId,
            @RequestParam String countryIso) {

        List<Long> usersIds = userService.getUserAndFriendsIds(userId);
        Long countryId = countryService.getCountryIdByIso3(countryIso);

        Map<Long, List<PlaceSummary>> placeSummariesPerUser = placesService.mapUsersToPlaceSummaries(usersIds, countryId);

        Double funRating = countryRatingService.getAverageFunRating(usersIds, countryId);
        Double securityRating = countryRatingService.getAverageSecurityRating(usersIds, countryId);

        return new CountrySummary(securityRating, funRating, placeSummariesPerUser);
    }

    @PostMapping("/{userId}/friend/{friendId}")
    public ResponseEntity<User> addFriend(@PathVariable("userId") Long userId, @PathVariable("friendId") Long friendId) {
        return ResponseEntity.ok(userService.addFriend(userId, friendId));
    }

}
