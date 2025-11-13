package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.UserDataDTO;
import com.zenifinance.core.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserDataDTOMapper {

    private final ModelMapper modelMapper;

    public UserDataDTOMapper (
            ModelMapper modelMapper
    ){
        this.modelMapper = modelMapper;
    }

    public UserDataDTO dto_returned (User user){
        UserDataDTO userDataDTO = new UserDataDTO();
        userDataDTO.setId(user.getId());
        userDataDTO.setName(user.getName());
        userDataDTO.setEmail(user.getEmail());
        userDataDTO.setPhone(user.getPhone());

        return userDataDTO;
    }
}
