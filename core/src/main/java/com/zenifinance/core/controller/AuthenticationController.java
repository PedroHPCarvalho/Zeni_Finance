package com.zenifinance.core.controller;

import com.zenifinance.core.dto.AuthenticationDTO;
import com.zenifinance.core.dto.LoginResponseDTO;
import com.zenifinance.core.dto.RegisterDTO;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.RegisterDTOMapper;
import com.zenifinance.core.repository.UserRepository;
import com.zenifinance.core.service.AuthenticationService;
import com.zenifinance.core.service.TokenService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            AuthenticationService authenticationService
    ){
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.authenticationService = authenticationService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User)auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (BadCredentialsException e) {
            log.warn("Tentativa de login inválida para o usuário {}", data.login());
            return ResponseEntity.status(401).body("{\"error\":\"Credenciais inválidas\"}");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data){
        authenticationService.register(data);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
