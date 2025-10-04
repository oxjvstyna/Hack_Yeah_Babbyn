package apka.model;

import java.util.ArrayList;

public record Country(ArrayList<Place> places, String name) {
}
