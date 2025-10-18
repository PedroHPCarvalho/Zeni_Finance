package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.FinancialRegistersFromN8NRawDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class FinancialRegisterCreateFromN8NDTOMapper {

    private final ModelMapper modelMapper;

    public FinancialRegisterCreateFromN8NDTOMapper(
            ModelMapper modelMapper
    ){
        this.modelMapper = modelMapper;
    }

    public FinancialRegisters financialRegisterCreateFromN8NDTOToEntity(FinancialRegistersFromN8NRawDTO financialRegistersFromN8NRawDTO, User idUser){
        FinancialRegisters financialRegisters = modelMapper.map(financialRegistersFromN8NRawDTO, FinancialRegisters.class);
        financialRegisters.setDateCreateRegister(LocalDateTime.now().toLocalDate().atStartOfDay());
        financialRegisters.setIdUser(idUser);
        return financialRegisters;
    }
}
