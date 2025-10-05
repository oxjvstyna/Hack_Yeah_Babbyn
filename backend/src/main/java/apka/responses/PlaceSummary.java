package apka.responses;

import java.util.Date;

public record PlaceSummary(String name,
                           String photo,
                           Long id,
                           Date date){}