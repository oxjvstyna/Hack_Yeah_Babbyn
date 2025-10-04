package apka.db;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "user_countries", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "country_id")
    private List<UUID> countryIds = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "user_places", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "place_id")
    private List<UUID> placeIds = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_user_id")
    )
    private Set<User> friends = new HashSet<>();
}
