package model;

import java.util.List;

public record Country(
        String name,
        List<Place> places
) {
}
