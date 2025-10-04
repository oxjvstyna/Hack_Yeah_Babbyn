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
    private CountryRepository countryRepository;

    public Country addNewCountry(String countryName){
        String iso3 = countryIsoMapper.toIso3FromEnglish(countryName);
        return countryRepository
                .save(Country.builder()
                        .name(countryName)
                        .iso3(iso3)
                        .name(countryName)
                        .build());
    }
}
