package com.cac.visitantes.business.service;

import com.cac.visitantes.domain.dto.VisitantesDto;

import java.util.List;

public interface VisitanteService {

    List<VisitantesDto> listarVisitantes();

    VisitantesDto buscarVisitanteId(Long id);

    VisitantesDto crearVisitante(VisitantesDto visitantesDto);

    VisitantesDto actualizarVisitante(Long id, VisitantesDto visitantesDto);

    void activarVisitante(Long id);

    void inactivarVisitante(Long id);
}