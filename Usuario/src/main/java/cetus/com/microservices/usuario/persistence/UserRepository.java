package cetus.com.microservices.usuario.persistence;

import cetus.com.microservices.usuario.domain.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer> {

    boolean existsByUsername(String userName);
    Optional<UserEntity> findByUsername(String username);

}
