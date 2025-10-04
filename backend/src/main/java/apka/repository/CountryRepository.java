package apka.repository;

import apka.db.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    Optional<Country> findById(Long id);
    Optional<Country> findByName(String name);
    Optional<Country> findByIso3(String iso3);
}