package rocks.zipcode.gg_tarot_go.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rocks.zipcode.gg_tarot_go.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
