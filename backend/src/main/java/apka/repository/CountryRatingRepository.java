package apka.repository;

import apka.db.CountryRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRatingRepository extends JpaRepository<CountryRating, Long> {
    Optional<CountryRating> findByUser_IdAndCountry_Id(Long userId, Long countryId);

    boolean existsByUser_IdAndCountry_Id(Long userId, Long countryId);

    List<CountryRating> findByUserId(Long userId);

}
