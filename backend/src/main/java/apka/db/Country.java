package apka.db;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Table(
        name = "countries",
        uniqueConstraints = @UniqueConstraint(columnNames = {"iso3"})
)
@Getter @Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 3)
    private String iso3;

    @Column()
    private String name;

    @Column()
    private Float securityRating;

    @Column()
    private Float funRating;

}

