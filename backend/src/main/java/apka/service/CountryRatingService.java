package apka.service;


import apka.db.Country;
import apka.db.CountryRating;
import apka.db.User;
import apka.repository.CountryRatingRepository;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryRatingService {

    private final CountryRatingRepository countryRatingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryRatingRepository countryRatingRepository;

    public CountryRating addNewCountryRating(User user, Country country) {
        return countryRatingRepository.save(CountryRating.builder()
                        .user(user)
                        .country(country)
                .build());
    }

    public CountryRating addCountryRating(User user, Country country, Float funRating, Float securityRating) {
        Optional<CountryRating> existingCountryRating = countryRatingRepository.findByCountryIdAndUserId(country.getId(), user.getId());
        CountryRating rating;
        rating = existingCountryRating.orElseGet(() -> addNewCountryRating(user, country));
        rating.setFunRating(funRating);
        rating.setSecurityRating(securityRating);
        return countryRatingRepository.save(rating);
    }

    public List<String> getCountriesNames(Long userId) {
        return countryRatingRepository.findByUserId(userId)
                .stream()
                .map(CountryRating::getCountry)
                .map(Country::getIso3)
                .toList();
    }

}
