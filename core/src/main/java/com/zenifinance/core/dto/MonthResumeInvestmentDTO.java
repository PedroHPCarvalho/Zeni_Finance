package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthResumeInvestmentDTO {
    private String mes;
    private Integer ano;
    private Double totalAportes;
    private Double totalResultados;
}
