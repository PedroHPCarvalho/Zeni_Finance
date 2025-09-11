package com.zenifinance.core.service;

import com.zenifinance.core.dto.RegisterDTO;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.exception.EmailAlreadyUsedException;
import com.zenifinance.core.exception.PhoneAlreadyUsedException;
import com.zenifinance.core.mapper.RegisterDTOMapper;
import com.zenifinance.core.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RegisterDTOMapper registerDTOMapper;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RegisterDTOMapper registerDTOMapper
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.registerDTOMapper = registerDTOMapper;
    }

    public void register(RegisterDTO data){
        if (userRepository.findByEmail(data.login()) != null){
            throw new EmailAlreadyUsedException(data.login());
        }
        else if (userRepository.findByEmail(data.getPhone()) != null){
            throw new PhoneAlreadyUsedException(data.getPhone());
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        User userWithPasswordEncoded = registerDTOMapper.registerDtoToEntityUser(data);
        userWithPasswordEncoded.setPassword(encryptedPassword);
        userRepository.save(userWithPasswordEncoded);
    }

}
