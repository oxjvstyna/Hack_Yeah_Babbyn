package apka.service;


import apka.db.Country;
import apka.db.CountryRating;
import apka.db.User;
import apka.repository.CountryRatingRepository;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryRatingService {

    private final CountryRatingRepository countryRatingRepository;
    private UserRepository userRepository;
    private CountryRepository countryRepository;

    @Transactional
    public CountryRating addOrRetrieveCountryRating(User user, Country country) {
        return countryRatingRepository
                .findByUser_IdAndCountry_Id(user.getId(), country.getId())
                .orElseGet(() -> {
                    CountryRating rating = new CountryRating();
                    rating.setUser(user);
                    rating.setCountry(country);
                    rating.setFunRating(null);
                    rating.setSecurityRating(null);
                    return countryRatingRepository.save(rating);
                });
    }

    @Transactional
    public CountryRating addCountryRating(User user, Country country, Float funRating, Float securityRating) {
        CountryRating rating = addOrRetrieveCountryRating(user, country);
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

    private CountryRating addNewCountryRating(User user, Country country) {
        return countryRatingRepository.save(CountryRating.builder()
                .user(user)
                .country(country)
                .build());
    }

}
