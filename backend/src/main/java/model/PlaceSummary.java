package model;

import java.time.LocalDateTime;

public record PlaceSummary(String name,
                    String photo,
                    int id,
                    LocalDateTime date){}