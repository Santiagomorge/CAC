package com.cac.recurso.persistence;

import com.cac.recurso.domain.entity.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Integer> {
    List<Recurso> findByEstadoRegistro(Boolean estadoRegistro);
}