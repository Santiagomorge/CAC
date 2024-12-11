package com.cac.visitantes.business.service.Impl;

import com.cac.visitantes.business.map.VisitanteMapper;
import com.cac.visitantes.business.service.VisitanteService;
import com.cac.visitantes.common.VisitanteNoEncontradoException;
import com.cac.visitantes.common.VisitanteYaExistenteException;
import com.cac.visitantes.domain.dto.VisitantesDto;
import com.cac.visitantes.domain.entity.Visitante;
import com.cac.visitantes.persistence.VisitanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VisitanteServiceImpl implements VisitanteService {

    private final VisitanteRepository visitanteRepository;
    private final VisitanteMapper visitanteMapper;

    @Override
    public List<VisitantesDto> listarVisitantes(){
        return visitanteRepository.findAll()
                .stream()
                .map(visitanteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public VisitantesDto buscarVisitanteId(Long id){
        return visitanteRepository.findById(id)
                .map(visitanteMapper::toDto)
                .orElseThrow(() -> new VisitanteNoEncontradoException(id));
    }

    @Override
    public VisitantesDto crearVisitante(VisitantesDto visitantesDto){
        if (visitanteRepository.existsByEmail(visitantesDto.getEmail())) {
            throw new VisitanteYaExistenteException(visitantesDto.getEmail());
        }
        Visitante visitante = visitanteMapper.dtoToEntity(visitantesDto);
        visitante.setFechaCreacion(LocalDateTime.now());
        Visitante nuevoVisitante = visitanteRepository.save(visitante);
        return visitanteMapper.toDto(nuevoVisitante);
    }

    @Override
    public VisitantesDto actualizarVisitante(Long id, VisitantesDto visitantesDto){
        if (!visitanteRepository.existsById(id)) {
            throw new VisitanteNoEncontradoException(id);
        }

        Visitante visitanteExistente = visitanteRepository.findById(id).orElseThrow(() -> new VisitanteNoEncontradoException(id));

        visitanteExistente.setNombre(visitantesDto.getNombre());
        visitanteExistente.setEmail(visitantesDto.getEmail());


        visitanteExistente.setFechaActualizacion(LocalDateTime.now());

        Visitante actualizado = visitanteRepository.save(visitanteExistente);
        return visitanteMapper.toDto(actualizado);
    }

    @Override
    public void activarVisitante(Long id){
        Visitante visitante = visitanteRepository.findById(id).orElseThrow();
        visitante.setEstado(true);
        visitanteRepository.save(visitante);
    }

    @Override
    public void inactivarVisitante(Long id){
        Visitante visitante = visitanteRepository.findById(id).orElseThrow();
        visitante.setEstado(false);
        visitanteRepository.save(visitante);
    }
}