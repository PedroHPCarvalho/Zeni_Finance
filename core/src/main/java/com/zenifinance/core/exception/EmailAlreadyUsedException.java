package com.zenifinance.core.exception;

public class EmailAlreadyUsedException extends RuntimeException{
    public  EmailAlreadyUsedException(String email){
        super("O email "+email+" já esta em uso");
    }
}
