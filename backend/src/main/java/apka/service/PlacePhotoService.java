package apka.service;

import apka.db.Place;
import apka.db.PlacePhoto;
import apka.repository.PlacePhotoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlacePhotoService {

    private final PlacePhotoRepository placePhotoRepository;

    @Transactional
    public PlacePhoto addPlacePhoto(Place place, String photoUrl) {
        return placePhotoRepository.save(
                PlacePhoto.builder()
                        .place(place)
                        .photoString(photoUrl)
                        .build()
        );
    }

    public List<PlacePhoto> addPlacePhotos(Place place) {
        return place.getPhotos().stream()
                .map(photo -> addPlacePhoto(place, photo.getPhotoString()))
                .collect(Collectors.toList());
    }
}
