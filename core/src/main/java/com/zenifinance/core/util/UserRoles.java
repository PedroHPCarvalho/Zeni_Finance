package com.zenifinance.core.util;

import lombok.Getter;

@Getter
public enum UserRoles {
    USER("user"),
    ADMIN("admin");

    private String role;

    UserRoles (String role){
        this.role = role;
    }

}
