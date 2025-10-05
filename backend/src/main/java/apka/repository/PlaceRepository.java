package apka.repository;

import apka.db.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCountryId(Long countryId);

    @Query("""
    SELECT p
    FROM Place p
    JOIN User u ON p.id IN (SELECT pid FROM u.placeIds pid)
    JOIN p.country c
    WHERE u.id = :userId
      AND c.id = :countryId
    ORDER BY p.date DESC   
    """)
    List<Place> findPlacesByUserAndCountryIso(
            @Param("userId") Long userId,
            @Param("countryId") Long countryIso
    );
}