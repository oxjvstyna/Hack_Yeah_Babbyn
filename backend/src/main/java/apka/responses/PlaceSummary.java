package apka.responses;

import java.util.Date;
import java.util.List;

public record PlaceSummary(String name,
                           List<String> photo,
                           Long id,
                           Date date){}