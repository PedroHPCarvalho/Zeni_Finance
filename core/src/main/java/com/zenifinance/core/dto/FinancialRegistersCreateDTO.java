package com.zenifinance.core.dto;

import com.zenifinance.core.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialRegistersCreateDTO {
    private String description;
    private String category;
    private Float value;
    private String typeRegister;
    private Date dateRegister;
}
