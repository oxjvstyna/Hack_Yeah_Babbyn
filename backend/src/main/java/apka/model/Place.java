package apka.model;

import java.util.ArrayList;

public record Place(
        String name,
        float width,
        float length,
        String description,
        ArrayList<String> photos,
        int rating,
        int id,
        ArrayList<Integer> travelBuddies) {
}
