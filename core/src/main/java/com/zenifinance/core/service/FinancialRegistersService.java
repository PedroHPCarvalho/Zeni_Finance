package com.zenifinance.core.service;

import com.zenifinance.core.dto.*;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.exception.PhoneNotFoundException;
import com.zenifinance.core.mapper.FinancialRegisterCreateFromN8NDTOMapper;
import com.zenifinance.core.repository.FinancialRegistersRepository;
import com.zenifinance.core.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinancialRegistersService {

    private final UserRepository userRepository;
    private final FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper;
    private final FinancialRegistersRepository financialRegistersRepository;

    public FinancialRegistersService(
            FinancialRegistersRepository financialRegistersRepository,
            UserRepository userRepository,
            FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper
    ){
        this.financialRegistersRepository = financialRegistersRepository;
        this.userRepository = userRepository;
        this.financialRegisterCreateFromN8NDTOMapper = financialRegisterCreateFromN8NDTOMapper;
    }

    public FinancialRegisters createRegister(FinancialRegisters financialRegisters, User user){
        financialRegisters.setIdUser(user);
        financialRegisters.setDateCreateRegister(LocalDateTime.now());
        return financialRegistersRepository.save(financialRegisters);
    }

    public FinancialRegisters financialRegistersCreateFromWhats(FinancialRegistersFromN8NRawDTO financialRegistersFromN8NRawDTO) {
        User UserFind = userRepository.findByPhone(financialRegistersFromN8NRawDTO.getPhone());
        FinancialRegisters financialRegistersToReturn;
        if (UserFind == null) {
            throw new PhoneNotFoundException(financialRegistersFromN8NRawDTO.getPhone());
        } else {
            financialRegistersToReturn = financialRegisterCreateFromN8NDTOMapper.financialRegisterCreateFromN8NDTOToEntity(financialRegistersFromN8NRawDTO, UserFind);
        }
        return financialRegistersToReturn;
    }

    public List<FinancialRegisters> listFinancRegistersByUserId(User user){
        List<FinancialRegisters> listRegistersOfUser = financialRegistersRepository.findByidUser(user);
        return listRegistersOfUser;
    }

    public FinancialRegisters updateRegisterById (FinancialRegisters financialRegisters, Long id, User user){
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

    public FinancialRegisterResumeDTO getResumeRegister (User userId){
        return financialRegistersRepository.findFinancialRegisterResumeByUserId(userId.getId());
    }

    public List<CategoryResumeDTO> getCategoryResume (Long userId){
        return financialRegistersRepository.findCategoryResumeByUserId(userId);
    }

    public List<MonthResumeDTO> getMonthResume(Long userId) {
        List<Object[]> results = financialRegistersRepository.findMonthResumeByUserId(userId);

        return results.stream().map(row -> new MonthResumeDTO(
                (String) row[1],      // ano
                ((BigDecimal) row[2]).doubleValue(), // mes (TO_CHAR)
                ((BigDecimal) row[3]).doubleValue(), // despesas
                ((Number) row[0]).intValue()  // receitas
                )).toList();
    }

    public List<MonthResumeInvestmentDTO> getMonthResumeInvestment(Long userId) {
        List<Object[]> results = financialRegistersRepository.findMonthResumeInvestByUserId(userId);

        return results.stream().map(row -> new MonthResumeInvestmentDTO(
                (String) row[0],                    // category
                ((Number) row[1]).doubleValue(),// valor_investido
                (String) row[2],                    // mes
                ((Number) row[3]).intValue()        // ano
        )).toList();
    }

    public Page<FinancialRegisters> listFinancRegistersByUserId(User user, Pageable pageable) {
        return financialRegistersRepository.findByidUser(user, pageable);
    }
}

