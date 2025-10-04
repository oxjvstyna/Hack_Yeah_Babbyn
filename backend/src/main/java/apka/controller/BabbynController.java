package apka.controller;

import apka.service.BabbynService;
import model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class BabbynController {

    private final BabbynService service;

    public BabbynController(BabbynService service) {
        this.service = service;
    }

    @PostMapping("/place")
    public String test(@RequestBody User user) {
        System.out.println(user.toString());
        service.test();
        return "ok";
    }
}

