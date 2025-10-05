package apka.responses;

import java.util.List;
import java.util.Map;

public record CountrySummary(double securityRating,
                             double funRating,
                             Map<Long, List<PlaceSummary>> placesPerUser) {
}
