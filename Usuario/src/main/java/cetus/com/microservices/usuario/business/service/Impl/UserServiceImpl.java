package cetus.com.microservices.usuario.business.service.Impl;

import cetus.com.microservices.usuario.business.service.UserService;
import cetus.com.microservices.usuario.business.map.UserMapper;
import cetus.com.microservices.usuario.common.RoleNotFoundException;
import cetus.com.microservices.usuario.common.UserNameExistsExeption;
import cetus.com.microservices.usuario.domain.dto.CreateUserDTO;
import cetus.com.microservices.usuario.domain.dto.ResponseResult;
import cetus.com.microservices.usuario.domain.dto.UserDTO;
import cetus.com.microservices.usuario.domain.entity.Role;
import cetus.com.microservices.usuario.domain.entity.UserEntity;
import cetus.com.microservices.usuario.persistence.RoleRepository;
import cetus.com.microservices.usuario.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleRepository roleRepo;

    @Override
    public ResponseResult<List<UserDTO>> getUsers() {
        try {
            List<UserEntity> usuarios = (List<UserEntity>) userRepository.findAll();
            List<UserDTO> usuarioDtos = usuarios.stream().map(userMapper::toUsuarioDto).collect(Collectors.toList());
            return new ResponseResult<>(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), usuarioDtos);
        } catch (Exception e) {
            return new ResponseResult<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener usuarios", null);
        }
    }

    @Override
    public ResponseResult<CreateUserDTO> getUser(Integer id) {
        try {
            Optional<UserEntity> usuarioOpt = userRepository.findById(id);
            if (usuarioOpt.isPresent()) {
                CreateUserDTO usuarioDto = userMapper.ToUsuarioCreateDto(usuarioOpt.get());
                return new ResponseResult<>(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), usuarioDto);
            } else {
                return new ResponseResult<>(HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }
        } catch (Exception e) {
            return new ResponseResult<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener el usuario, " + e.getMessage(), null);
        }
    }

    @Override
    public ResponseResult<UserDTO> saveUser(CreateUserDTO createUserDTO) {
        try {
            if(userRepository.existsByUsername(createUserDTO.getUsername())){
                throw new UserNameExistsExeption("El nombre de usuario no se encuentra disponible");
            }

            Role role = roleRepo.findById(createUserDTO.getRol())
                    .orElseThrow( () -> new RoleNotFoundException("Rol con id " + createUserDTO.getRol() + " inválido"));
            UserEntity userEntity = userMapper.ToUsuario(createUserDTO);
            userEntity.setRol(role);
            userRepository.save(userEntity);

            UserDTO dto = userMapper.toUsuarioDto(userEntity);
            return new ResponseResult<>(HttpStatus.CREATED.value(), "¡Usuario registrado con éxito!", dto);
        } catch (UserNameExistsExeption e){
            return new ResponseResult<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        } catch (Exception e) {
            return new ResponseResult<>(HttpStatus.BAD_REQUEST.value(), "Error al guardar el usuario, " + e.getMessage(), null);
        }
    }

    @Override
    public ResponseResult<CreateUserDTO> updateUser(CreateUserDTO createUserDTO) {
        try {
            Optional<UserEntity> existingUserOpt = userRepository.findById(createUserDTO.getId());
            if (existingUserOpt.isPresent()) {
                UserEntity existingUser = existingUserOpt.get();
                userMapper.updateEntityFromDto(createUserDTO, existingUser);
                UserEntity updatedUser = userRepository.save(existingUser);
                CreateUserDTO updatedCreateUserDTO = userMapper.ToUsuarioCreateDto(updatedUser);
                return new ResponseResult<>(HttpStatus.OK.value(), "Usuario actualizado con éxito", updatedCreateUserDTO);
            } else {
                return new ResponseResult<>(HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }
        } catch (Exception e) {
            return new ResponseResult<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al actualizar el usuario, " + e.getMessage(), null);
        }
    }

    @Override
    public ResponseResult<List<Role>> getRoles() {
        return new ResponseResult<>(HttpStatus.OK.value(), "Lista de roles éxito", roleRepo.findAll());
    }
}
