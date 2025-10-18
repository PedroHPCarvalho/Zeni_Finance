package com.zenifinance.core.service;

<<<<<<< HEAD
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.repository.FinancialRegistersRepository;

=======
import com.zenifinance.core.dto.FinancialRegistersFromN8NRawDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.exception.PhoneNotFoundException;
import com.zenifinance.core.mapper.FinancialRegisterCreateFromN8NDTOMapper;
import com.zenifinance.core.repository.FinancialRegistersRepository;

import com.zenifinance.core.repository.UserRepository;
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FinancialRegistersService {

    private final FinancialRegistersRepository financialRegistersRepository;
<<<<<<< HEAD

    public FinancialRegistersService(
            FinancialRegistersRepository financialRegistersRepository
    ){
        this.financialRegistersRepository = financialRegistersRepository;
    }


=======
    private final UserRepository userRepository;
    private final FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper;

    public FinancialRegistersService(
            FinancialRegistersRepository financialRegistersRepository,
            UserRepository userRepository,
            FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper
    ){
        this.financialRegistersRepository = financialRegistersRepository;
        this.userRepository = userRepository;
        this.financialRegisterCreateFromN8NDTOMapper = financialRegisterCreateFromN8NDTOMapper;
    }

>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
    public FinancialRegisters createRegister(FinancialRegisters financialRegisters, User user){
        financialRegisters.setIdUser(user);
        financialRegisters.setDateCreateRegister(LocalDateTime.now());
        return financialRegistersRepository.save(financialRegisters);
    }

<<<<<<< HEAD
=======
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
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)

    public List<FinancialRegisters> listFinancRegistersByUserId(User user){
        List<FinancialRegisters> listRegistersOfUser = financialRegistersRepository.findByidUser(user);
        return listRegistersOfUser;
    }

<<<<<<< HEAD

=======
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
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

<<<<<<< HEAD

=======
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
    public void deleteRegisterById(Long id){
        financialRegistersRepository.deleteById(id);
    }
}

