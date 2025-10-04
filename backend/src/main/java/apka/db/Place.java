package apka.db;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "places")
@Getter
@Setter
public class Place {
    @Id
    @GeneratedValue
    private UUID id;

    @Column()
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal width;
    @Column(precision = 10, scale = 2)
    private BigDecimal length;

    @Column(columnDefinition = "text")
    private String description;

    @Column()
    private int rating = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "country_id")
    private Country country;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<PlacePhoto> photos = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "place_travel_buddies",
            joinColumns = @JoinColumn(name = "place_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> travelBuddies = new HashSet<>();

    @Column()
    @Temporal(TemporalType.DATE)
    private Date date;
}