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
    public Country addOrRetrieveCountry(String countryIso) {

        Optional<Country> existing = countryRepository.findByIso3(countryIso);
        if (existing.isPresent()) {
            return existing.get();
        }

        Country country = new Country();
        country.setName(iso3ToName(countryIso));
        country.setIso3(countryIso);
        return countryRepository.save(country);
    }


    private Country addNewCountry(String countryIso) {
        return countryRepository
                .save(Country.builder()
                        .name(iso3ToName(countryIso))
                        .iso3(countryIso)
                        .build());
    }

    public static String iso3ToName(String iso3) {
        if (iso3 == null) return null;
        CountryCode code = CountryCode.getByCode(iso3.trim().toUpperCase());
        return code != null ? code.getName() : null;
    }

    public Long getCountryIdByIso3(String iso3) {
        Optional<Country> country = countryRepository.findByIso3(iso3);
        return country.map(Country::getId).orElse(null);
    }
}
