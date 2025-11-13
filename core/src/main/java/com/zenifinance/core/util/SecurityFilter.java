package com.zenifinance.core.util;

import com.zenifinance.core.repository.UserRepository;
import com.zenifinance.core.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
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
        System.out.println("🔹 Caminho: " + path);

        // 🔹 Endpoints públicos
        if (path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs") || path.startsWith("/auth") || path.equals("/financial-registers/create/whats")) {
            System.out.println("✅ Liberando caminho público: " + path);
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 Validação do token
        String token = recoverToken(request);
        if(token == null){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Token não fornecido");
            return;
        }

        try {
            String subject = tokenService.validateToken(token);
            if(subject == null){
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Token inválido");
                return;
            }

            UserDetails user = userRepository.findByEmail(subject);
            if(user == null){
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Usuário não encontrado");
                return;
            }

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception e){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Erro ao validar token: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
