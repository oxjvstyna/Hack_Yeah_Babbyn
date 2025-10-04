package apka.controller;


import apka.repository.CountryRatingRepository;
import apka.service.BabbynService;
import apka.service.CountryRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private BabbynService babbynService;

    @Autowired
    private CountryRatingService countryRatingService;

    @PostMapping("")
    public ResponseEntity<Long> newUser() {
        return ResponseEntity.ok(babbynService.saveUser());
    }

    @GetMapping("{userId}/countries/")
    public List<String> getCountries(@PathVariable("userId") Long userId) {
        return countryRatingService.getCountriesNames(userId);
    }

}
