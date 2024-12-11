package com.cac.recurso.config;

import com.cac.recurso.business.map.RecursoMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public RecursoMapper recursoMapper() {
        return Mappers.getMapper(RecursoMapper.class);
    }
}