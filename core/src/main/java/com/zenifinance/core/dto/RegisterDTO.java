package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    private String name;
    private String password;
    private String email;
    private String phone;
    private String role;

    public String login(){
        return email;
    }

    public String password(){
        return password;
    }
}
