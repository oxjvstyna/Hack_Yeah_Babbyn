package apka.service;

import apka.controller.request.PlaceRequest;
import apka.db.Country;
import apka.db.CountryRating;
import apka.db.Place;
import apka.db.User;
import apka.repository.CountryRepository;
import apka.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryService countryService;
    @Autowired
    private CountryRatingService countryRatingService;
    @Autowired
    private PlaceService placeService;

    public Long saveUser() {
        User saved = userRepository.save(new User());
        return saved.getId();
    }

    @Transactional
    public User addFriend(Long userId, Long friendId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        user.getFriends().add(friend);
        return userRepository.save(user);
    }

    @Transactional
    public User addUserCountry(Long userId, String countryIso) {
        Country country = countryService.addOrRetrieveCountry(countryIso);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        CountryRating countryRating = countryRatingService.addOrRetrieveCountryRating(user, country);
        user.addCountryRating(countryRating);
        return userRepository.save(user);
    }

    @Transactional
    public User deleteUserCountry(Long userId, String countryIso) {
        Country country = countryService.addOrRetrieveCountry(countryIso);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        CountryRating countryRating = countryRatingService.addOrRetrieveCountryRating(user, country);
        user.removeCountryRating(countryRating);
        return userRepository.save(user);
    }

    @Transactional
    public User addFunRating(Long userId, String countryIso, Float rating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        Country country = countryService.addOrRetrieveCountry(countryIso);
        CountryRating countryRating = countryRatingService.addOrRetrieveCountryRating(user, country);
        countryRating.setFunRating(rating);
        return userRepository.save(user);
    }

    @Transactional
    public User addSecRating(Long userId, String countryIso, Float rating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));
        Country country = countryService.addOrRetrieveCountry(countryIso);
        CountryRating countryRating = countryRatingService.addOrRetrieveCountryRating(user, country);
        countryRating.setSecurityRating(rating);
        return userRepository.save(user);
    }

    @Transactional
    public User addUserPlace(Long userId, PlaceRequest placeRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("user not found"));

        Country country = countryService.addOrRetrieveCountry(placeRequest.getCountryIso());
        countryRatingService.addOrRetrieveCountryRating(user, country);
        System.out.println("here");
        Place place = placeService.addPlace(placeRequest);
        System.out.println("here");
        user.getPlaceIds().add(place.getId());
        return userRepository.save(user);
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

    public Map<Long, String> getUserAndFriendsNames(List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);

        return users.stream()
                .collect(Collectors.toMap(
                        User::getId,
                        User::getName
                ));
    }

    public Map<Long, String> getPhoto(List<Long> userIds) {
        List<User> users = userRepository.findAllById(userIds);

        return users.stream()
                .collect(Collectors.toMap(
                        User::getId,
                        User::getProfilePhoto
                ));
    }
}

