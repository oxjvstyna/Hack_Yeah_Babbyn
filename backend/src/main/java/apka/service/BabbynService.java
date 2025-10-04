package apka.service;

import apka.db.Country;
import apka.db.User;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BabbynService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;

    public Long saveUser(){
        User saved = userRepository.save(new User());
        return saved.getId();
    }

    public void addCountry(Long userId, String countryName) {
        Optional<Country> country = countryRepository.findByName(countryName);
        if (country.isPresent()){

        }

    }
}
