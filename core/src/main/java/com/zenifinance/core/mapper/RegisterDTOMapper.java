package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.RegisterDTO;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.util.UserRoles;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RegisterDTOMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public RegisterDTOMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public User registerDtoToEntityUser(RegisterDTO registerDTO) {
        User user = modelMapper.map(registerDTO, User.class);
        if (user.getRole() == null){
            user.setRole(UserRoles.USER);
        }
        return user;
    }
}
