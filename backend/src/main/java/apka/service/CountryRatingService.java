package apka.service;


import apka.db.Country;
import apka.db.CountryRating;
import apka.repository.CountryRatingRepository;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryRatingService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryRatingRepository countryRatingRepository;


    public List<String> getCountriesNames(Long userId) {
        return countryRatingRepository.findByUserId(userId)
                .stream()
                .map(CountryRating::getCountry)
                .map(Country::getIso3)
                .toList();
    }
}
