package apka.controller;

import apka.service.BabbynService;
import model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class BabbynController {

    private final BabbynService service;

    public BabbynController(BabbynService service) {
        this.service = service;
    }

    @PostMapping("/place")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        service.saveUsers(List.of(user));
        return ResponseEntity.status(HttpStatus.CREATED).body("ok");
    }

    @PostMapping("/countries/{userId}")
    public ResponseEntity<String> saveCountry(@PathVariable int userId, @RequestParam String country) {
        service.saveCountry(country, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("ok");
    }

    @GetMapping("/countries/{userId}")
    public List<String> getCountries(@PathVariable("userId") Integer userId) {
        return service.getCountries(userId);
    }
}

