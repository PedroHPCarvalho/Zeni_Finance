package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.AuthenticationDTO;
import com.zenifinance.core.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationDTOMapper {

    private final ModelMapper modelMapper;

    public AuthenticationDTOMapper(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    public User authenticationDtoToEntity(AuthenticationDTO authenticationDTO){
        User user = new User();
        user.setEmail(authenticationDTO.login());
        user.setPassword(authenticationDTO.password());
        return user;
    }

}
