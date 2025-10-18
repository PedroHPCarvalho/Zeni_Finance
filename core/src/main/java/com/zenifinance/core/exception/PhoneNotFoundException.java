package com.zenifinance.core.exception;

public class PhoneNotFoundException extends RuntimeException {
    public PhoneNotFoundException(String phone) {
        super("O telefone "+phone+" não esta cadastrado");
    }
}
