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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryRatingService {

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

    public List<String> getCountriesIsos(Long userId) {
        return countryRatingRepository.findByUserId(userId)
                .stream()
                .map(CountryRating::getCountry)
                .map(Country::getIso3)
                .toList();
    }

    public Double getAverageFunRating(List<Long> userIds, Long countryId){
        Double rating = countryRatingRepository.findAverageFunRatingByCountryAndUserIds(countryId, userIds);
        return roundToOneDecimal(rating);
    }


    public Double getAverageSecurityRating(List<Long> userIds, Long countryId){
        Double rating = countryRatingRepository.findAverageSecurityRatingByCountryAndUserIds(countryId, userIds);
        return roundToOneDecimal(rating);
    }
    private double roundToOneDecimal(double rating) {
        return BigDecimal.valueOf(rating)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }

}
