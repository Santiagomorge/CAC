package com.cac.visitantes.business.map;

import com.cac.visitantes.domain.dto.VisitantesDto;
import com.cac.visitantes.domain.entity.Visitante;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface VisitanteMapper {


    VisitantesDto toDto(Visitante visitante);


    Visitante dtoToEntity(VisitantesDto visitantesDto);
}