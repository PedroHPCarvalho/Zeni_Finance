package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthResumeInvestmentDTO {
    private String category;
    private Double valor_investido;
    private String mes;
    private Integer ano;
}
