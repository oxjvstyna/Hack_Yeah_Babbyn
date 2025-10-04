package model;

import java.time.LocalDateTime;
import java.util.List;

public record Place(
        String name,
        float width,
        float length,
        String description,
        String mainPhoto,
        List<String> photos,
        int rating,
        int id,
        List<Integer> travelBuddies,
        LocalDateTime date
) {
}
