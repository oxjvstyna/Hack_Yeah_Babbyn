package apka.controller;


import apka.controller.request.PlaceRequest;
import apka.db.User;
import apka.responses.CountryRatingResponse;
import apka.responses.CountrySummary;
import apka.responses.PlaceSummary;
import apka.responses.UserResponse;
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
    public ResponseEntity<String> saveCountry(@PathVariable("userId") Long userId, @RequestParam String countryIso) {
        userService.addUserCountry(userId, countryIso);
        return ResponseEntity.ok("OK");
    }

    @DeleteMapping("/{userId}/country")
    public ResponseEntity<UserResponse> deleteCountry(@PathVariable("userId") Long userId, @RequestParam String countryIso) {
        return ResponseEntity.ok(toDto(userService.deleteUserCountry(userId, countryIso)));
    }

    @PostMapping("/{userId}/funRating")
    public ResponseEntity<UserResponse> addFunRating(@PathVariable("userId") Long userId, @RequestParam String countryIso, @RequestParam Float rating) {
        return ResponseEntity.ok(toDto(userService.addFunRating(userId, countryIso, rating)));
    }

    @PostMapping("/{userId}/secRating")
    public ResponseEntity<UserResponse> addSecRating(@PathVariable("userId") Long userId, @RequestParam String countryIso, @RequestParam Float rating) {
        return ResponseEntity.ok(toDto(userService.addSecRating(userId, countryIso,  rating)));
    }

    @PostMapping("/{userId}/place")
    public ResponseEntity<UserResponse> savePlace(@PathVariable("userId") Long userId, @RequestBody PlaceRequest placeRequest) {
        return ResponseEntity.ok(toDto(userService.addUserPlace(userId, placeRequest)));
    }

    @GetMapping("/{userId}/countries")
    public List<String> getCountries(@PathVariable("userId") Long userId) {
        return countryRatingService.getCountriesIsos(userId);
    }

    @GetMapping("/places/{userId}")
    public CountrySummary getUserAndFriendsPlacesByCountry(
            @PathVariable Long userId,
            @RequestParam String countryIso) {

        List<Long> usersIds = userService.getUserAndFriendsIds(userId);
        Long countryId = countryService.getCountryIdByIso3(countryIso);
        System.out.println("countryId: " + countryId);

        Map<Long, List<PlaceSummary>> placeSummariesPerUser = placesService.mapUsersToPlaceSummaries(usersIds, countryId);

        Double funRating = countryRatingService.getAverageFunRating(usersIds, countryId);
        Double securityRating = countryRatingService.getAverageSecurityRating(usersIds, countryId);

        return new CountrySummary(securityRating, funRating, placeSummariesPerUser);
    }

    @PostMapping("/{userId}/friend/{friendId}")
    public ResponseEntity<UserResponse> addFriend(@PathVariable("userId") Long userId, @PathVariable("friendId") Long friendId) {
        return ResponseEntity.ok(toDto(userService.addFriend(userId, friendId)));
    }

    private UserResponse toDto(User u) {
        List<Long> friendIds = u.getFriends().stream().map(User::getId).toList();
        List<CountryRatingResponse> ratings = u.getCountryRatings().stream()
                .map(r -> new CountryRatingResponse(r.getId(), r.getFunRating(), r.getSecurityRating()))
                .toList();
        return new UserResponse(u.getId(), u.getName(), u.getPlaceIds(), friendIds, ratings);
    }

}
