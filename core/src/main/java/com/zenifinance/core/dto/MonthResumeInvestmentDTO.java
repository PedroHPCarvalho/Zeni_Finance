package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthResumeInvestmentDTO {
    public String category;
    public Double valor_investido;
    public String mes;


}
