package com.cac.compania;
import static org.mockito.Mockito.*;


import java.util.Collections;
import java.util.List;
import java.util.Optional;
import com.cac.compania.business.service.Impl.CompaniaServiceImpl;
import com.cac.compania.domain.dto.CompaniaDto;
import com.cac.compania.domain.entity.Compania;
import com.cac.compania.persistence.CompaniaRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CompaniaServiceImplTest {

	@Mock
	private CompaniaRepository companiaRepository;

	@InjectMocks
	private CompaniaServiceImpl companiaService;

	private Compania compania;
	private CompaniaDto companiaDto;

	@BeforeEach
	public void setUp() {
		compania = new Compania();
		compania.setId(1);
		compania.setNombre("Test Compania");
		companiaDto = new CompaniaDto();
		companiaDto.setNombre("Test Compania");
	}

	@Test
	void testListarCompanias() {
		when(companiaRepository.findAll()).thenReturn(Collections.singletonList(compania));

		List<Compania> result = companiaService.listarCompanias();

		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(1, result.size());
		Assertions.assertEquals("Test Compania", result.get(0).getNombre());
	}

	@Test
	void testBuscarPorId() {
		when(companiaRepository.findById(1)).thenReturn(Optional.of(compania));

		Optional<Compania> result = companiaService.buscarPorId(1);

		Assertions.assertTrue(result.isPresent());
		Assertions.assertEquals("Test Compania", result.get().getNombre());
	}

	@Test
	void testCrearCompania() {
		when(companiaRepository.save(any(Compania.class))).thenReturn(compania);

        companiaService.crearCompania(companiaDto);

        Assertions.assertEquals("Test Compania", compania.getNombre());
	}

	@Test
	void testActualizarCompania() {
		when(companiaRepository.findById(1)).thenReturn(Optional.of(compania));
		Compania companiaActualizada = new Compania();
		companiaActualizada.setNombre("Updated Compania");

        companiaService.actualizarCompania(1, companiaDto);

        verify(companiaRepository, times(1)).save(compania);
	}

	@Test
	void testActivarCompania() {
		when(companiaRepository.findById(1)).thenReturn(Optional.of(compania));

		companiaService.activarCompania(1);

		Assertions.assertTrue(compania.isEstado());
		verify(companiaRepository, times(1)).save(compania);
	}

	@Test
	void testInactivarCompania() {
		when(companiaRepository.findById(1)).thenReturn(Optional.of(compania));

		companiaService.inactivarCompania(1);

		Assertions.assertFalse(compania.isEstado());
		verify(companiaRepository, times(1)).save(compania);
	}
}