package com.cac.recurso;

import com.cac.recurso.business.service.impl.RecursoServiceImpl;
import com.cac.recurso.common.RecursoNotFoundException;
import com.cac.recurso.domain.dto.RecursoDto;
import com.cac.recurso.domain.entity.Recurso;
import com.cac.recurso.persistence.RecursoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecursoServiceImplTest {
    @Mock
    private RecursoRepository recursoRepository;

    @InjectMocks
    private RecursoServiceImpl recursoService;

    private RecursoDto recursoDto;
    private Recurso recurso;

    @BeforeEach
    public void setUp() {
        recursoDto = new RecursoDto();
        recursoDto.setNombre("Recurso Test");
        recursoDto.setCantidad(10);
        recursoDto.setEstadoRegistro(true);
        recursoDto.setFechaCreacion(LocalDateTime.now());
        recursoDto.setFechaActualizacion(LocalDateTime.now());

        recurso = new Recurso();
        recurso.setNombre("Recurso Test");
        recurso.setCantidad(10);
        recurso.setEstadoRegistro(true);
        recurso.setFechaCreacion(LocalDateTime.now());
        recurso.setFechaActualizacion(LocalDateTime.now());
    }

    @Test
    void listarRecursoTest() {
        Recurso recurso1 = new Recurso();
        Recurso recurso2 = new Recurso();
        when(recursoRepository.findAll()).thenReturn(Arrays.asList(recurso1, recurso2));

        List<Recurso> recursos = recursoService.listarRecurso();

        assertEquals(2, recursos.size());
        verify(recursoRepository).findAll();
    }

    @Test
    void buscarPorIdTest() {
        when(recursoRepository.findById(1)).thenReturn(Optional.of(recurso));

        Optional<Recurso> resultado = recursoService.buscarPorId(1);

        assertTrue(resultado.isPresent());
        assertEquals(recurso, resultado.get());
        verify(recursoRepository).findById(1);
    }

    @Test
    void crearRecursoTest() {
        when(recursoRepository.save(any(Recurso.class))).thenReturn(recurso);

        Recurso resultado = recursoService.crearRecurso(recursoDto);

        assertNotNull(resultado, "El resultado no debería ser nulo.");
        assertEquals(recurso.getNombre(), resultado.getNombre(), "Los nombres deberían ser iguales.");
        assertEquals(recurso.getCantidad(), resultado.getCantidad(), "Las cantidades deberían ser iguales.");

        verify(recursoRepository).save(any(Recurso.class));
    }

    @Test
    void actualizarRecursoTest() {
        when(recursoRepository.findById(1)).thenReturn(Optional.of(recurso));
        when(recursoRepository.save(any(Recurso.class))).thenReturn(recurso);

        Recurso updatedRecurso = recursoService.actualizarRecurso(1, recursoDto);

        assertEquals(recurso, updatedRecurso);
        assertNotNull(recurso.getFechaActualizacion());
        verify(recursoRepository).findById(1);
        verify(recursoRepository).save(any(Recurso.class));
    }

    @Test
    void eliminarRecursoExistenteTest() {
        when(recursoRepository.existsById(1)).thenReturn(true);

        assertDoesNotThrow(() -> recursoService.eliminarRecurso(1));
        verify(recursoRepository).deleteById(1);
    }

    @Test
    void eliminarRecursoNoExistenteTest() {
        when(recursoRepository.existsById(1)).thenReturn(false);

        Exception exception = assertThrows(
                RecursoNotFoundException.class, () -> recursoService.eliminarRecurso(1));
        assertEquals("El recurso no existe", exception.getMessage());
        verify(recursoRepository, never()).deleteById(1);
    }
}