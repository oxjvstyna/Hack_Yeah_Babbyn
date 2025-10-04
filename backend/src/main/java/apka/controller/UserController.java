package apka.controller;


import apka.service.BabbynService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private BabbynService babbynService;

    @PostMapping("")
    public ResponseEntity<Long> newUser() {
        return ResponseEntity.ok(babbynService.saveUser());
    }

}
