package apka.responses;

import apka.db.User;

import java.util.List;
import java.util.Set;

public record UserResponse(
        Long id,
        Set<Long> placeIds,
        List<Long> friendIds,
        List<CountryRatingResponse> countryRatings
) {
}