package com.zenifinance.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<String> handlerEmailAlreadyUsed (EmailAlreadyUsedException emailAlreadyUsedException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(emailAlreadyUsedException.getMessage());
    }

    @ExceptionHandler(PhoneAlreadyUsedException.class)
    public ResponseEntity<String> handlerPhoneAlreadyUsed (PhoneAlreadyUsedException phoneAlreadyUsedException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(phoneAlreadyUsedException.getMessage());
    }
}
