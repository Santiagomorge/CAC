package com.cac.recurso.business.service;

import com.cac.recurso.domain.dto.RecursoDto;
import com.cac.recurso.domain.entity.Recurso;
import java.util.List;
import java.util.Optional;

public interface RecursoService {

    List<Recurso> listarRecurso();

    Optional<Recurso> buscarPorId(int id);

    Recurso crearRecurso(RecursoDto recursoDto);

    Recurso actualizarRecurso(Integer id, RecursoDto recursoActualizado);

    void eliminarRecurso(Integer id);

    Optional<Recurso> activarRecurso(int id);

    Optional<Recurso> inactivarRecurso(int id);

    List<Recurso> getRecursosActivos();
}