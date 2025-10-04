package apka.service;

import apka.db.Country;
import apka.db.User;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import apka.utils.CountryIsoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BabbynService {

    private UserRepository userRepository;
    private CountryRepository countryRepository;
    private CountryService countryService;

    public Long saveUser(){
        User saved = userRepository.save(new User());
        return saved.getId();
    }

    public void addCountry(Long userId, String countryName) {
        Optional<Country> existingCountry = countryRepository.findByName(countryName);
        Country country = existingCountry.orElseGet(
                () -> countryService.addNewCountry(countryName));


    }
}
