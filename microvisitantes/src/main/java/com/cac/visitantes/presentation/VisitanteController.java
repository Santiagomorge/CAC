package com.cac.visitantes.presentation;

import com.cac.visitantes.business.service.VisitanteService;
import com.cac.visitantes.domain.dto.VisitantesDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/visitantes")
public class VisitanteController {

    private final VisitanteService visitanteService;

    @GetMapping("/listar")
    public ResponseEntity<List<VisitantesDto>> listarVisitantes(){
        return ResponseEntity.ok(visitanteService.listarVisitantes());
    }

    @GetMapping("{id}")
    public ResponseEntity<VisitantesDto> buscarVisitanteId(@PathVariable Long id){
        VisitantesDto visitante = visitanteService.buscarVisitanteId(id);

        if(visitante != null){
            return ResponseEntity.ok(visitante);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/crear")
    public ResponseEntity<VisitantesDto> crearVisitante(@RequestBody VisitantesDto visitante){
        VisitantesDto nuevoVisitante = visitanteService.crearVisitante(visitante);
        return new ResponseEntity<>(nuevoVisitante, HttpStatus.CREATED);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<VisitantesDto> actualizarVisitante(@PathVariable Long id, @RequestBody VisitantesDto visitante){
        VisitantesDto visitanteActualizado = visitanteService.actualizarVisitante(id, visitante);
        return ResponseEntity.ok(visitanteActualizado);
    }

    @PostMapping("/activar/{id}")
    public ResponseEntity<Void> activarVisitante(@PathVariable Long id){
        visitanteService.activarVisitante(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/inactivar/{id}")
    public ResponseEntity<Void> inactivarVisitantes(@PathVariable Long id){
        visitanteService.inactivarVisitante(id);
        return ResponseEntity.ok().build();
    }
}