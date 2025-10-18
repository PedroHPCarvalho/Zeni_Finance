package com.zenifinance.core.util;

public enum TypeRegisters {
    DESPESA,
    RECEITA;

    public static boolean isValid(String value) {
        if (value == null || value.isEmpty()) return false;
        try {
            TypeRegisters.valueOf(value.toUpperCase());
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
