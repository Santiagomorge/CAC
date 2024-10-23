package cetus.com.microservices.usuario.business.map;

import cetus.com.microservices.usuario.domain.dto.CreateUserDTO;
import cetus.com.microservices.usuario.domain.dto.UserDTO;
import cetus.com.microservices.usuario.domain.entity.Role;
import cetus.com.microservices.usuario.domain.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "rol", ignore = true)
    UserEntity ToUsuario(CreateUserDTO createUserDto);

    @Mapping(target = "rol", ignore = true)
    CreateUserDTO ToUsuarioCreateDto(UserEntity userEntity);

    @Mapping(target = "rol", ignore = true)
    void updateEntityFromDto(CreateUserDTO createUserDto, @MappingTarget UserEntity userEntity);

    UserDTO toUsuarioDto(UserEntity userEntity);

//    default Long map(Role role) {
//        return role != null ? role.getId() : null;
//    }
}
