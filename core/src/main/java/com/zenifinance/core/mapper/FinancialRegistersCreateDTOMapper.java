package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class FinancialRegistersCreateDTOMapper {

    private final ModelMapper modelMapper;

    public FinancialRegistersCreateDTOMapper(ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    public FinancialRegisters financialRegistersCreateDTOToEntity(FinancialRegistersCreateDTO financialRegistersCreateDTO){
        FinancialRegisters financialRegisters = modelMapper.map(financialRegistersCreateDTO, FinancialRegisters.class);
        financialRegisters.setDateCreateRegister(LocalDateTime.now().toLocalDate().atStartOfDay());
        return financialRegisters;
    }
}
