package com.zenifinance.core.service;

import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.FinancialRegisterResponseDTOMapper;
import com.zenifinance.core.mapper.FinancialRegistersCreateDTOMapper;
import com.zenifinance.core.repository.FinancialRegistersRepository;
import com.zenifinance.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FinancialRegistersService {

    @Autowired
    private FinancialRegistersRepository financialRegistersRepository;
    @Autowired
    private FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper;

    public FinancialRegisters createFinancRegister(FinancialRegisters financialRegisters, User user){
        financialRegisters.setIdUser(user);
        financialRegisters.setDateCreateRegister(LocalDateTime.now());
        return financialRegistersRepository.save(financialRegisters);
    }

    public List<FinancialRegisters> listFinancRegistersByUserId(User user){
        List<FinancialRegisters> listRegistersOfUser = financialRegistersRepository.findByidUser(user);
        return listRegistersOfUser;
    }

    public FinancialRegisters updateFinancRegisterById (FinancialRegisters financialRegisters, Long id, User user){
        return financialRegistersRepository.findById(id)
                .map(existing -> {
                    existing.setDescription(financialRegisters.getDescription());
                    existing.setCategory(financialRegisters.getCategory());
                    existing.setValue(financialRegisters.getValue());
                    existing.setIdUser(user);
                    existing.setTypeRegister(financialRegisters.getTypeRegister());
                    existing.setDateRegister(financialRegisters.getDateRegister());

                    return financialRegistersRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Registro Financeiro não encontrado com esse id"));
    }

    public void deleteRegisterById(Long id){
        financialRegistersRepository.deleteById(id);
    }
}

