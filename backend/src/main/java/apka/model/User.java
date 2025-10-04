package apka.model;

import java.util.ArrayList;

public record User(int userID, ArrayList<Country> countries, ArrayList<Integer> friends) {
}
