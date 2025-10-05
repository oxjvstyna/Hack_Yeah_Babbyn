package apka.service;

import apka.db.Country;
import apka.repository.CountryRepository;
import apka.utils.CountryIsoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CountryService {

    private CountryIsoMapper countryIsoMapper;
    private final CountryRepository countryRepository;

    public Country addNewCountry(String countryName){
        String iso3 = countryIsoMapper.toIso3FromEnglish(countryName);
        return countryRepository
                .save(Country.builder()
                        .name(countryName)
                        .iso3(iso3)
                        .name(countryName)
                        .build());
    }

    public Long getCountryIdByIso3(String iso3) {
        Country country = countryRepository.findByIso3(iso3)
                .orElseThrow(() -> new RuntimeException("Country not found for iso3: " + iso3));
        return country.getId();
    }
}
