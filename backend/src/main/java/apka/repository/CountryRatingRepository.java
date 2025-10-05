package apka.repository;

import apka.db.CountryRating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRatingRepository extends JpaRepository<CountryRating, Long> {
    Optional<CountryRating> findByCountryIdAndUserId(Long countryId, Long userId);
    List<CountryRating> findByUserId(Long userId);


    @Query("""
        SELECT AVG(cr.funRating)
        FROM CountryRating cr
        WHERE cr.country.id = :countryId
          AND cr.user.id IN :userIds
    """)
    Double findAverageFunRatingByCountryAndUserIds(
            @Param("countryId") Long countryId,
            @Param("userIds") List<Long> userIds
    );


    @Query("""
        SELECT AVG(cr.securityRating)
        FROM CountryRating cr
        WHERE cr.country.id = :countryId
          AND cr.user.id IN :userIds
    """)
    Double findAverageSecurityRatingByCountryAndUserIds(
            @Param("countryId") Long countryId,
            @Param("userIds") List<Long> userIds
    );

}
