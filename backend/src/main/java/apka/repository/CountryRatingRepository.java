package apka.repository;

import apka.db.Country;
import apka.db.CountryRating;
import apka.db.User;
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

}
