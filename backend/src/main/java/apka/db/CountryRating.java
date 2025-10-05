package apka.db;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter @Setter
@Entity
@Table(
        name = "country_ratings",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "country_id", "type"})
)
@NoArgsConstructor
@AllArgsConstructor
public class CountryRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-countryRatings")
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    @JsonBackReference("country-ratings")
    private Country country;

    @Column(name = "fun_rating")
    private Float funRating;

    @Column(name = "security_rating")
    private Float securityRating;
}


