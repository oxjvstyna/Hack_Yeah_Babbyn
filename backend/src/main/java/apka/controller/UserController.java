package apka.controller;


import apka.controller.request.PlaceRequest;
import apka.db.User;
import apka.service.CountryRatingService;
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

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private CountryRatingService countryRatingService;

    @PostMapping("")
    public ResponseEntity<Long> newUser() {
        return ResponseEntity.ok(userService.saveUser());
    }

    @PostMapping("/{userId}/country")
    public ResponseEntity<User> saveCountry(@PathVariable("userId") Long userId, @RequestParam String countryName) {
        System.out.println(countryName);
        return ResponseEntity.ok(userService.addUserCountry(userId, countryName));
    }

    @PostMapping("/{userId}/place")
    public ResponseEntity<User> savePlace(@PathVariable("userId") Long userId, @RequestBody PlaceRequest placeRequest) {
        userService.addUserPlace(userId, placeRequest);
        return ResponseEntity.ok(userService.addUserPlace(userId, placeRequest));
    }

    @GetMapping("/{userId}/countries/")
    public List<String> getCountries(@PathVariable("userId") Long userId) {
        return countryRatingService.getCountriesNames(userId);
    }

}
