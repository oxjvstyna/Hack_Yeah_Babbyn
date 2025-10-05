package apka.service;

import apka.db.Place;
import apka.db.PlacePhoto;
import apka.db.User;
import apka.repository.PlaceRepository;
import apka.responses.PlaceSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlacesService {

    private final PlaceRepository placeRepository;
    public Map<Long, List<PlaceSummary>> mapUsersToPlaceSummaries(List<Long> usersIds, Long countryId) {
        return usersIds.stream()
                .collect(Collectors.toMap(
                        userId -> userId,
                        userId -> getPlaceSummariesForUser(userId, countryId)
                ));
    }

    private List<PlaceSummary> getPlaceSummariesForUser(Long userId, Long countryId) {
        List<Place> places = placeRepository.findPlacesByUserAndCountryIso(userId, countryId);

        return places.stream()
                .map(this::mapToPlaceSummary)
                .toList();
    }

    private PlaceSummary mapToPlaceSummary(Place place) {
        List<String> photos = null;

        if (place.getPhotos() != null && !place.getPhotos().isEmpty()) {
            photos = place.getPhotos().stream()
                    .map(PlacePhoto::getPhotoString)
                    .collect(Collectors.toList());
        }

        return new PlaceSummary(place.getName(), photos, place.getId(), place.getDate());
    }
}
