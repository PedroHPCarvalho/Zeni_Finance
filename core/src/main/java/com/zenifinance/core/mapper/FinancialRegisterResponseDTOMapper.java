package com.zenifinance.core.mapper;

import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FinancialRegisterResponseDTOMapper {

    private ModelMapper modelMapper;

    public FinancialRegisterResponseDTOMapper (ModelMapper modelMapper){
        this.modelMapper = modelMapper;
    }

    public FinancialRegistersResponseDTO financialRegistersToDTO (FinancialRegisters financialRegisters){
        return modelMapper.map(financialRegisters, FinancialRegistersResponseDTO.class);
    }

    public List<FinancialRegistersResponseDTO> financialRegistersResponseDTOList (List<FinancialRegisters> financialRegisters){
        return financialRegisters.stream().map(entity -> modelMapper.map(entity, FinancialRegistersResponseDTO.class)).toList();
    }
}
