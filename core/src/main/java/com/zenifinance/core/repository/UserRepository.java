package com.zenifinance.core.repository;

import com.zenifinance.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    UserDetails findByEmail(String email);
<<<<<<< HEAD
    UserDetails findByPhone(String phone);
=======
    User findByPhone(String phone);
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
}
