package com.zenifinance.core.controller;

import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.FinancialRegisterResponseDTOMapper;
import com.zenifinance.core.mapper.FinancialRegistersCreateDTOMapper;
import com.zenifinance.core.service.FinancialRegistersService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("financial-registers")
public class FinancialRegistersController {

    private final FinancialRegistersService financialRegistersService;
    private final FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper;
    private final FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper;

    public FinancialRegistersController(
            FinancialRegistersService financialRegistersService,
            FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper,
            FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper
    ){
        this.financialRegistersService = financialRegistersService;
        this.financialRegistersCreateDTOMapper = financialRegistersCreateDTOMapper;
        this.financialRegisterResponseDTOMapper = financialRegisterResponseDTOMapper;
    }

    @PostMapping("/")
    public ResponseEntity<FinancialRegistersResponseDTO> create(@RequestBody @Valid FinancialRegistersCreateDTO data, @AuthenticationPrincipal User user){
        var financialRegisterEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        FinancialRegisters saved = financialRegistersService.createRegister(financialRegisterEntity, user);
        FinancialRegistersResponseDTO financialDTOReturned = financialRegisterResponseDTOMapper.financialRegistersToDTO(saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(financialDTOReturned);
    }

    @GetMapping("/list")
    public ResponseEntity list(@AuthenticationPrincipal User user){
        var listOfRegister = financialRegistersService.listFinancRegistersByUserId(user);
        var listOfRegisterDTOResponse = financialRegisterResponseDTOMapper.financialRegistersResponseDTOList(listOfRegister);

        return ResponseEntity.ok().body(listOfRegisterDTOResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FinancialRegistersResponseDTO> update(@RequestBody @Valid FinancialRegistersCreateDTO data, @PathVariable("id") Long id, @AuthenticationPrincipal User user){
        var registryToEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        var registryUpdated = financialRegistersService.updateRegisterById(registryToEntity, id,user);
        FinancialRegistersResponseDTO financialDTOResponseUPDTReturn = financialRegisterResponseDTOMapper.financialRegistersToDTO(registryUpdated);

        return ResponseEntity.status(HttpStatus.OK).body(financialDTOResponseUPDTReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long idForDelete){
        financialRegistersService.deleteRegisterById(idForDelete);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
