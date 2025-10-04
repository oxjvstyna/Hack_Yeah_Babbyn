package apka.service;

import apka.db.User;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BabbynService {

    @Autowired
    private UserRepository userRepository;

    public Long saveUser(){
        User saved = userRepository.save(new User());
        return saved.getId();
    }
}
