package com.zenifinance.core.controller;

import com.zenifinance.core.dto.UserDataDTO;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.UserDataDTOMapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class UserDataController {

    private final UserDataDTOMapper userDataDTOMapper;

    public UserDataController (
            UserDataDTOMapper userDataDTOMapper
    ) {
        this.userDataDTOMapper = userDataDTOMapper;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDataDTO> getUserData (@AuthenticationPrincipal User user){
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Token inválido");
        }
        UserDataDTO data_user = userDataDTOMapper.dto_returned(user);

        return ResponseEntity.status(HttpStatus.OK).body(data_user);
    }


}
