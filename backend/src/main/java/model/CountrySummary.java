package model;

import java.util.List;
import java.util.Map;

public record CountrySummary(float securityRating,
                             float funRating,
                             Map<Integer, List<PlaceSummary>> placesPerUser) {
}
