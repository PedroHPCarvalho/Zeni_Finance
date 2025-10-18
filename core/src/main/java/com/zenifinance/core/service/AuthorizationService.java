package com.zenifinance.core.service;

<<<<<<< HEAD
import com.zenifinance.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
=======
import com.zenifinance.core.entity.User;
import com.zenifinance.core.exception.PhoneNotFoundException;
import com.zenifinance.core.repository.UserRepository;
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    private final UserRepository userRepository;

    public AuthorizationService(
            UserRepository userRepository
    ){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }
<<<<<<< HEAD
=======

    public User loadUserByPhone(String phone) throws UsernameNotFoundException{
        return  userRepository.findByPhone(phone);
    }
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
}
