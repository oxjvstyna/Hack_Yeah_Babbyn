package apka.service;

import apka.db.Country;
import apka.repository.CountryRepository;
import com.neovisionaries.i18n.CountryCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountryService {

    @Autowired
    private final CountryRepository countryRepository;

    @Transactional
    public Country addOrRetrieveCountry(String countryName) {

        Optional<Country> existing = countryRepository.findByName(countryName);
        if (existing.isPresent()) {
            return existing.get();
        }

        Country country = new Country();
        country.setName(countryName);
        country.setIso3(nameToIso3(countryName));
        return countryRepository.save(country);
    }


    private Country addNewCountry(String countryName) {
        String iso3 = nameToIso3(countryName);
        return countryRepository
                .save(Country.builder()
                        .name(countryName)
                        .iso3(iso3)
                        .name(countryName)
                        .build());
    }

    public static String nameToIso3(String name) {
        if (name == null) return null;
        for (CountryCode c : CountryCode.values()) {
            if (c.getName().equalsIgnoreCase(name.trim())) {
                return c.getAlpha3();
            }
        }
        return null;
    }

    public Long getCountryIdByIso3(String iso3) {
        Country country = countryRepository.findByIso3(iso3)
                .orElseThrow(() -> new RuntimeException("Country not found for iso3: " + iso3));
        return country.getId();
    }
}
