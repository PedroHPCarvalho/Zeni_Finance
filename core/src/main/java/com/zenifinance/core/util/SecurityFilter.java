package com.zenifinance.core.util;

import com.zenifinance.core.repository.UserRepository;
import com.zenifinance.core.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
=======
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
<<<<<<< HEAD

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
=======
import java.io.IOException;


@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    public SecurityFilter(
            TokenService tokenService,
            UserRepository userRepository
    ){
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();
        var token = this.recoverToken(request);

        // Ignora endpoints públicos
        if(path.startsWith("/swagger-ui") || path.startsWith("/financial-registers/createFromWhats")){
            filterChain.doFilter(request, response);
            return;
        }

>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
        if(token != null){
            var subject =  tokenService.validateToken(token);
            UserDetails user = userRepository.findByEmail(subject);

<<<<<<< HEAD
            var authentication = new UsernamePasswordAuthenticationToken(user,null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication );
=======
            if(user != null){ // <<--- evita NullPointerException
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
        }
        filterChain.doFilter(request,response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
