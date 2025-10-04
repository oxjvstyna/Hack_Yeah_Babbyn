package apka.service;

import apka.db.User;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;

    public Long saveUser(){
        User saved = userRepository.save(new User());
        return saved.getId();
    }
}
