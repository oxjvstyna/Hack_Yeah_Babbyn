package apka.repository;

import apka.db.PlacePhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacePhotoRepository extends JpaRepository<PlacePhoto, Long> {
}
