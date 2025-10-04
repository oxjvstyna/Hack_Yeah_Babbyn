package apka.controller;

import apka.service.BabbynService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class BabbynController {

    private final BabbynService service;

    public BabbynController(BabbynService service) {
        this.service = service;
    }

    @PostMapping("/")
    public ResponseEntity<UUID> saveUser() {
        return null;
    }

    @PostMapping("/countries/{userId}")
    public ResponseEntity<String> saveCountry(@PathVariable int userId, @RequestParam String country) {
        return null;
    }

    @GetMapping("/countries/{userId}")
    public List<String> getCountries(@PathVariable("userId") Integer userId) {
        return null;
    }
}

