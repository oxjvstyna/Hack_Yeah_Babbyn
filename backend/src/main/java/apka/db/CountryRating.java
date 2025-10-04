package apka.db;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(
        name = "country_ratings",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "country_id", "type"})
)
public class CountryRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_country_ratings_user"))
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_country_ratings_country"))
    private Country country;

    @Column(name = "fun_rating")
    private Float funRating;

    @Column(name = "security_rating")
    private Float securityRating;
}

