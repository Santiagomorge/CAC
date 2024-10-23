package cetus.com.microservices.usuario.business.service;

import cetus.com.microservices.usuario.domain.dto.CreateUserDTO;
import cetus.com.microservices.usuario.domain.dto.ResponseResult;
import cetus.com.microservices.usuario.domain.dto.UserDTO;
import cetus.com.microservices.usuario.domain.entity.Role;

import java.util.List;

public interface UserService {
    
    ResponseResult<List<UserDTO>> getUsers();
    ResponseResult<CreateUserDTO> getUser(Integer id);
    ResponseResult<UserDTO> saveUser(CreateUserDTO createUserDTO);
    ResponseResult<CreateUserDTO> updateUser(CreateUserDTO createUserDTO);
    ResponseResult<List<Role>> getRoles();
}
