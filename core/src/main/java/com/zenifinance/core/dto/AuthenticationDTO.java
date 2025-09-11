package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationDTO{
    private String login;
    private String password;

    public String login(){
        return login;
    }
    public String password(){
        return  password;
    }
}
