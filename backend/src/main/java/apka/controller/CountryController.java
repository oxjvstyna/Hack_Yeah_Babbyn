package apka.controller;


import apka.service.BabbynService;
import apka.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/country")
@RequiredArgsConstructor
public class CountryController {

    private CountryService countryService;
    private User

    @PostMapping("/{userId}")
    public ResponseEntity<Long> addCountry(@PathVariable Long userId, @RequestParam String countryName) {
        return ResponseEntity.ok(countryService.addNewCountry(countryName));
    }
}
