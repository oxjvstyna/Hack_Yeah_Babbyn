package apka.controller;

import apka.service.BabbynService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BabbynController {

    private final BabbynService service;

    public BabbynController(BabbynService service) {
        this.service = service;
    }

    @GetMapping("/test")
    public String test() {
        dafa
        service.test();
        return "ok";
    }
}

