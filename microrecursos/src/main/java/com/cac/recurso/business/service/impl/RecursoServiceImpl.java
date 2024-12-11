package com.cac.recurso.business.service.impl;

import com.cac.recurso.business.map.RecursoMapper;
import com.cac.recurso.business.service.RecursoService;
import com.cac.recurso.common.RecursoNotFoundException;
import com.cac.recurso.domain.dto.RecursoDto;
import com.cac.recurso.domain.entity.Recurso;
import com.cac.recurso.persistence.RecursoRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecursoServiceImpl implements RecursoService {

    private final RecursoRepository recursoRepository;

    @Override
    public List<Recurso> listarRecurso(){
        return recursoRepository.findAll();
    }

    @Override
    public Optional<Recurso> buscarPorId(int id){
        return recursoRepository.findById(id);
    }

    @Override
    public Recurso crearRecurso(RecursoDto recursoDto) {
        if (recursoDto == null) {
            throw new IllegalArgumentException("RecursoDto no puede ser nulo");
        }try {
            Recurso recurso = RecursoMapper.INSTANCE.recursoDtoToRecurso(recursoDto);
            recurso.setFechaCreacion(LocalDateTime.now());
            return recursoRepository.save(recurso);
        } catch (DataAccessException ex) {
            throw new RecursoNotFoundException("Error al guardar el recurso");
        }
    }

    @Override
    public Recurso actualizarRecurso(Integer id,RecursoDto recursoActualizado){
        Recurso recurso = recursoRepository.findById(id)
                .orElseThrow (() -> new RecursoNotFoundException("El recurso no existe"));

        RecursoMapper.INSTANCE.updateRecursoFromDto(recursoActualizado,recurso);
        recurso.setFechaActualizacion(LocalDateTime.now());
        recursoRepository.save(recurso);
        return recurso;
    }

    @Override
    public void eliminarRecurso(Integer id){
        if (recursoRepository.existsById(id)){
            recursoRepository.deleteById(id);
        }else{
            throw new RecursoNotFoundException("El recurso no existe");
        }
    }
    public Optional<Recurso> activarRecurso(int id) {
        return cambiarEstadoRecurso(id, true);
    }

    public Optional<Recurso> inactivarRecurso(int id) {
        return cambiarEstadoRecurso(id, false);
    }

    private Optional<Recurso> cambiarEstadoRecurso(int id, boolean estado) {
        Optional<Recurso> recursoOpt = recursoRepository.findById(id);
        if (recursoOpt.isPresent()) {
            Recurso recurso = recursoOpt.get();
            recurso.setEstadoRegistro(estado);
            recursoRepository.save(recurso);
        }
        return recursoOpt;
    }

    public List<Recurso> getRecursosActivos() {
        return recursoRepository.findByEstadoRegistro(true);
    }
}