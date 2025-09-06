package com.zenifinance.core.controller;

import com.zenifinance.core.dto.AuthenticationDTO;
import com.zenifinance.core.dto.LoginResponseDTO;
import com.zenifinance.core.dto.RegisterDTO;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.RegisterDTOMapper;
import com.zenifinance.core.repository.UserRepository;
import com.zenifinance.core.service.TokenService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RegisterDTOMapper registerDTOMapper;
    @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User)auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(userRepository.findByEmail(data.login()) != null){
            return ResponseEntity.badRequest().body("Email em Uso");
        }

        log.info("DTO vindo da Requisição: {}", data);

        String encryptedPassword = passwordEncoder.encode(data.password());
        User userWithPasswordEncoded = registerDTOMapper.registerDtoToEntityUser(data);
        userWithPasswordEncoded.setPassword(encryptedPassword);
        log.info("Usuário após o mapeamento: {}", userWithPasswordEncoded);
        userRepository.save(userWithPasswordEncoded);

        return ResponseEntity.ok().build();
    }

}
