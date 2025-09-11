package com.zenifinance.core.entity;

import com.zenifinance.core.util.UserRoles;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User implements UserDetails {
    // Primary Key Id auto incremental, unica, tem como objetivo indexar o usuario
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome do usuario, nao pode ser nulo
    @Column(nullable = false)
    private String name;

    // Senha do usuario, pode ser nulo caso o usuario utilize autenticacao via WhatsApp
    @Column(nullable = false)
    private String password;

    // Email do usuario, pode ser nulo, porem deve ser unico
    @Column(nullable = true, unique = true)
    private String email;

    // Telefone do usuario, nao pode ser nulo e deve ser unico
    //deve ser string para suportar o codigo do pais e o +
    @Column(nullable = false, unique = true, length = 25)
    private String phone;

    // Papel do usuario, pode ser ADMIN ou USER, por padrao usuario registrado e USER
    @Column(nullable = false)
    private UserRoles role;

//    public User(String name, String password, String email, String phone) {
//        this.name = name;
//        this.password = password;
//        this.email = email;
//        this.phone = phone;
//        this.role = UserRoles.USER;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRoles.ADMIN){
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        }
        else{
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
