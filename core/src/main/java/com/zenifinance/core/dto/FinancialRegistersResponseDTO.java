package com.zenifinance.core.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FinancialRegistersResponseDTO {
    private Long id;
    private String description;
    private String category;
    private Float value;
    private String typeRegister;
    private Date dateRegister;
}
