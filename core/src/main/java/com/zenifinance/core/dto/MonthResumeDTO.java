package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthResumeDTO {
    private String mes;
    private Double despesas;
    private Double receitas;
}
