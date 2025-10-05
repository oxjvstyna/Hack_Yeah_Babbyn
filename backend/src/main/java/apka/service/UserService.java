package apka.service;

import apka.db.User;
import apka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public Long saveUser(){
        User saved = userRepository.save(new User());
        return saved.getId();
    }

    public List<Long> getUserAndFriendsIds(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<User> allUsers = new ArrayList<>();
        allUsers.add(user);
        allUsers.addAll(user.getFriends());

        return allUsers.stream()
                .map(User::getId)
                .toList();
    }




}

