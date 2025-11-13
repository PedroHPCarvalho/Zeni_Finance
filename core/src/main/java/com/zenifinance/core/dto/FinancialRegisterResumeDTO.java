package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialRegisterResumeDTO {
    private Double sumEntry;
    private Double sumExit;
    private Double balanceNow;

}