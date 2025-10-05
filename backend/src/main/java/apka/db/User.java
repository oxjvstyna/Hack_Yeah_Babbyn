package apka.db;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String name;

    @Column()
    private String profilePhoto;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-countryRatings")
    private Set<CountryRating> countryRatings = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "user_places", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "place_id")
    private Set<Long> placeIds = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_user_id")
    )
    private Set<User> friends = new HashSet<>();

    public void addCountryRating(CountryRating rating) {
        countryRatings.add(rating);
        rating.setUser(this);
    }

    public void removeCountryRating(CountryRating rating) {
        countryRatings.remove(rating);
        rating.setUser(null);
    }
}
