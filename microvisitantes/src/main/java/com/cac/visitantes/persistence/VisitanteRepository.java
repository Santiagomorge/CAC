package com.cac.visitantes.persistence;

import com.cac.visitantes.domain.entity.Visitante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitanteRepository extends JpaRepository<Visitante, Long> {
    boolean existsByEmail(String email);
}