package cetus.com.microservices.usuario.presentation;

import cetus.com.microservices.usuario.business.service.UserService;
import cetus.com.microservices.usuario.domain.dto.CreateUserDTO;
import cetus.com.microservices.usuario.domain.dto.ResponseResult;
import cetus.com.microservices.usuario.domain.dto.UserDTO;
import cetus.com.microservices.usuario.domain.entity.Role;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "api/v1/users" )
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ResponseResult<List<UserDTO>>> getAllUsers() {
        ResponseResult<List<UserDTO>> result = userService.getUsers();
        return new ResponseEntity<>(result, HttpStatus.valueOf(result.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseResult<CreateUserDTO>> getUser(@PathVariable Integer id) {
        ResponseResult<CreateUserDTO> result = userService.getUser(id);
        return new ResponseEntity<>(result, HttpStatus.valueOf(result.getCode()));
    }

    @PostMapping
    public ResponseEntity<ResponseResult<UserDTO>> saveUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        ResponseResult<UserDTO> result = userService.saveUser(createUserDTO);
        return new ResponseEntity<>(result, HttpStatus.valueOf(result.getCode()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseResult<CreateUserDTO>> updateUser(@Valid @PathVariable Integer id, @RequestBody CreateUserDTO createUserDTO) {
        createUserDTO.setId(id);
        ResponseResult<CreateUserDTO> result = userService.updateUser(createUserDTO);
        return new ResponseEntity<>(result, HttpStatus.valueOf(result.getCode()));
    }

    @GetMapping("/roles")
    public ResponseEntity<ResponseResult<List<Role>>> getRoles(){
        var result = userService.getRoles();
        return new ResponseEntity<>(result, HttpStatus.valueOf(result.getCode()));
    }

}
