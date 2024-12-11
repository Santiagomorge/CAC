package com.cac.recurso.business.map;

import com.cac.recurso.domain.dto.RecursoDto;
import com.cac.recurso.domain.entity.Recurso;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RecursoMapper {
    RecursoMapper INSTANCE = Mappers.getMapper(RecursoMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estadoRegistro", source = "estadoRegistro")
    Recurso recursoDtoToRecurso(RecursoDto recursoDto);

    @Mapping(target = "id", ignore = true)
    void updateRecursoFromDto(RecursoDto dto, @MappingTarget Recurso recurso);
}