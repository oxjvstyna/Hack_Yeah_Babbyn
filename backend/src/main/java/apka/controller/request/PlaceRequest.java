package apka.controller.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
public class PlaceRequest {

    private String countryIso;
    private String name;
    private BigDecimal width;
    private BigDecimal length;
    private String description;
    private int rating;
    private List<String> photos;
    private List<Integer> travelBuddies;
    private Date date;
}
