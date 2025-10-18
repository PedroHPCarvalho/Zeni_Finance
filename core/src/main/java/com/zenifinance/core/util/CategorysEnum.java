package com.zenifinance.core.util;

import lombok.Getter;

@Getter
public enum CategorysEnum {
    // 💸 Despesas
    ALIMENTACAO,
    TRANSPORTE,
    MORADIA,
    SAUDE,
    EDUCACAO,
    LAZER_E_ENTRETENIMENTO,
    BETS_E_JOGOS_DE_AZAR,
    VESTUARIO,
    SERVICOS,
    IMPOSTOS_E_TAXAS,

    // 💰 Receitas
    SALARIO,
    FREELANCE_E_SERVICOS_PRESTADOS,
    INVESTIMENTOS,
    PRESENTES_E_DOACOES_RECEBIDAS,
    REEMBOLSOS_E_RESTITUICOES;

    public static boolean isValid(String value){
        if (value == null || value.isEmpty()) return false;
        try {
            CategorysEnum.valueOf(value.toUpperCase()
                    .replace(" ","_")
                    .replace("-","_"));
            return true;
        } catch (IllegalArgumentException e){
            return false;
        }
    }
}
