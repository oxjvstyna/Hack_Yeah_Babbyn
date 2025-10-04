package apka.controller;

import apka.service.BabbynService;
import model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public String test(@RequestBody User user) {
        service.saveUsers(List.of(user));
        return "ok";
    }
}

