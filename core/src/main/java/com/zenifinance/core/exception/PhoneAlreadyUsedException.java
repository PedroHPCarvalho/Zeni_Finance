package com.zenifinance.core.exception;

public class PhoneAlreadyUsedException extends RuntimeException {
  public PhoneAlreadyUsedException(String phone) {
    super("O telefone "+phone+" esta em uso");
  }
}
