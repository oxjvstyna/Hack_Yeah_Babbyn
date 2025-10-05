package apka.service;

import apka.controller.request.PlaceRequest;
import apka.db.Country;
import apka.db.Place;
import apka.repository.PlaceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final CountryService countryService;

    @Transactional
    public Place addPlace(PlaceRequest req) {
        Country country = countryService.addOrRetrieveCountry(req.getCountryName());

        Place place = Place.builder()
                .name(req.getName())
                .description(req.getDescription())
                .country(country)
                .width(req.getWidth())
                .length(req.getLength())
                .rating(req.getRating())
                .date(req.getDate())
                .build();

        List<String> photoUrls = req.getPhotos() != null ? req.getPhotos() : List.of();
        for (String url : photoUrls) {
            place.addPhoto(url);
        }
        return placeRepository.save(place);
    }
}
