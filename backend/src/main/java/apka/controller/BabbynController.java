package apka.controller;

import apka.service.BabbynService;
import model.User;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
public class BabbynController {

    private final BabbynService service;

    public BabbynController(BabbynService service) {
        this.service = service;
    }

    @PostMapping("/place")
    public String test(@RequestBody User user) {
        service.saveUsers(List.of(user));
        return "ok";
    }

    @GetMapping("/countries/{userId}")
    public List<String> getCountries(@PathVariable("userId") Integer userId) {
        return service.getCountries(userId);
    }
}

