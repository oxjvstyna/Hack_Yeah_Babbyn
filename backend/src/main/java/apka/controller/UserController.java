package apka.controller;


import apka.responses.CountrySummary;
import apka.responses.PlaceSummary;
import apka.service.CountryRatingService;
import apka.service.CountryService;
import apka.service.PlacesService;
import apka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> saveCountry(@PathVariable("userId") String userId, @RequestBody String countryName) {
        return null;
    }

    @GetMapping("{userId}/countries/")
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

}
