package apka.repository;

import apka.db.CountryRating;
import apka.db.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRatingRepository extends JpaRepository<CountryRating, Long> {
    List<CountryRating> findByUserId(Long userId);

}
