package com.cac.recurso.presentation;

import com.cac.recurso.business.service.RecursoService;
import com.cac.recurso.domain.dto.RecursoDto;
import com.cac.recurso.domain.entity.Recurso;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/recurso")
@Tag(name = "Recursos", description = "Operaciones relacionadas con recursos")
public class RecursoController {
    private final RecursoService recursoService;

    @GetMapping("/listar")
    @Operation(summary = "obtener recursos", description = "Devuelve todos los recursos registrados")
    public ResponseEntity<List<Recurso>> listarRecursos() {
        List<Recurso> recursos = recursoService.listarRecurso();
        return new ResponseEntity<>(recursos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "obtener recurso por ID", description = "Devuelve el recurso encontrado por el id indicado")
    public ResponseEntity<Recurso> buscarRecursoId(@PathVariable Integer id){
        return recursoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/crear")
    @Operation(summary = "crear recurso", description = "Devuelve la confirmacion del recurso creado")
    public ResponseEntity<Recurso> crearRecurso(@RequestBody RecursoDto recursoDto) {
        Recurso nuevoRecurso = recursoService.crearRecurso(recursoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoRecurso);
    }

    @PutMapping("/actualizar/{id}")
    @Operation(summary = "actualizar recurso", description = "Devuelve la confirmacion de la actualizacion del recurso")
    public ResponseEntity<Recurso> actualizarRecurso(@PathVariable Integer id, @RequestBody RecursoDto recurso) {
        Recurso recursoActualizado = recursoService.actualizarRecurso(id, recurso);
        return recursoActualizado != null ? ResponseEntity.ok(recursoActualizado) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/eliminar/{id}")
    @Operation(summary = "eliminar recurso", description = "Devuelve la confirmacion del recurso eliminado")
    public ResponseEntity<Void> eliminarRecurso(@PathVariable Integer id) {
        recursoService.eliminarRecurso(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/activar/{id}")
    public ResponseEntity<Recurso> activarRecurso(@PathVariable int id) {
        Optional<Recurso> recurso = recursoService.activarRecurso(id);
        return recurso.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/inactivar/{id}")
    public ResponseEntity<Recurso> inactivarRecurso(@PathVariable int id) {
        Optional<Recurso> recurso = recursoService.inactivarRecurso(id);
        return recurso.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Recurso>> getRecursosDisponibles(){
        List<Recurso> recursos = recursoService.getRecursosActivos();
        return ResponseEntity.ok(recursos);
    }
}