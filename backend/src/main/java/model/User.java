package model;

import java.util.List;

public record User(
        int userId,
        List<Country> countries,
        List<Integer> friends
) {
}
