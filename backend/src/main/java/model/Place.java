package model;

import java.util.List;

public record Place(
        String name,
        float width,
        float length,
        String description,
        List<String> photos,
        int rating,
        int id,
        List<Integer> travelBuddies
) {
}
