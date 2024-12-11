import com.cac.visitantes.business.map.VisitanteMapper;
import com.cac.visitantes.business.service.Impl.VisitanteServiceImpl;
import com.cac.visitantes.common.VisitanteNoEncontradoException;
import com.cac.visitantes.common.VisitanteYaExistenteException;
import com.cac.visitantes.domain.dto.VisitantesDto;
import com.cac.visitantes.domain.entity.Visitante;
import com.cac.visitantes.persistence.VisitanteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VisitanteServiceImplTest {

    @Mock
    private VisitanteRepository visitanteRepository;

    @Mock
    private VisitanteMapper visitanteMapper;

    @InjectMocks
    private VisitanteServiceImpl visitanteService;

    private VisitantesDto visitantesDto;
    private Visitante visitante;

    @BeforeEach
    public void setUp() {
        visitantesDto = new VisitantesDto();
        visitante = new Visitante();
    }

    @Test
     void listarVisitantes() {
        when(visitanteRepository.findAll()).thenReturn(Collections.singletonList(visitante));
        when(visitanteMapper.toDto(visitante)).thenReturn(visitantesDto);

        List<VisitantesDto> result = visitanteService.listarVisitantes();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(visitantesDto, result.get(0));
        verify(visitanteRepository).findAll();
    }

    @Test
     void buscarVisitanteId_found() {
        Long id = 1L;
        when(visitanteRepository.findById(id)).thenReturn(Optional.of(visitante));
        when(visitanteMapper.toDto(visitante)).thenReturn(visitantesDto);

        VisitantesDto result = visitanteService.buscarVisitanteId(id);

        assertNotNull(result);
        assertEquals(visitantesDto, result);
        verify(visitanteRepository).findById(id);
    }

    @Test
     void buscarVisitanteId_notFound() {
        Long id = 1L;
        when(visitanteRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(VisitanteNoEncontradoException.class, () -> {
            visitanteService.buscarVisitanteId(id);
        });
    }

    @Test
     void crearVisitante() {
        when(visitanteRepository.existsByEmail(any())).thenReturn(false);
        when(visitanteMapper.dtoToEntity(visitantesDto)).thenReturn(visitante);
        when(visitanteRepository.save(visitante)).thenReturn(visitante);
        when(visitanteMapper.toDto(visitante)).thenReturn(visitantesDto);

        VisitantesDto result = visitanteService.crearVisitante(visitantesDto);

        assertNotNull(result);
        assertEquals(visitantesDto, result);
        verify(visitanteRepository).save(visitante);
    }

    @Test
     void crearVisitante_emailYaExistente() {
        when(visitanteRepository.existsByEmail(any())).thenReturn(true);

        assertThrows(VisitanteYaExistenteException.class, () -> {
            visitanteService.crearVisitante(visitantesDto);
        });
    }

    @Test
     void actualizarVisitante() {
        Long id = 1L;
        when(visitanteRepository.existsById(id)).thenReturn(true);
        when(visitanteMapper.dtoToEntity(visitantesDto)).thenReturn(visitante);
        when(visitanteRepository.save(visitante)).thenReturn(visitante);
        when(visitanteMapper.toDto(visitante)).thenReturn(visitantesDto);

        VisitantesDto result = visitanteService.actualizarVisitante(id, visitantesDto);

        assertNotNull(result);
        assertEquals(visitantesDto, result);
        verify(visitanteRepository).save(visitante);
    }

    @Test
     void actualizarVisitante_notFound() {
        Long id = 1L;
        when(visitanteRepository.existsById(id)).thenReturn(false);

        assertThrows(VisitanteNoEncontradoException.class, () -> {
            visitanteService.actualizarVisitante(id, visitantesDto);
        });
    }

    @Test
     void activarVisitante() {
        Long id = 1L;
        when(visitanteRepository.findById(id)).thenReturn(Optional.of(visitante));

        visitanteService.activarVisitante(id);

        ArgumentCaptor<Visitante> captor = ArgumentCaptor.forClass(Visitante.class);
        verify(visitanteRepository).save(captor.capture());

        assertTrue(captor.getValue().isEstado());
    }

    @Test
     void inactivarVisitante() {
        Long id = 1L;
        when(visitanteRepository.findById(id)).thenReturn(Optional.of(visitante));

        visitanteService.inactivarVisitante(id);

        ArgumentCaptor<Visitante> captor = ArgumentCaptor.forClass(Visitante.class);
        verify(visitanteRepository).save(captor.capture());

        assertFalse(captor.getValue().isEstado());
    }
}