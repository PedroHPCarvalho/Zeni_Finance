package com.zenifinance.core.controller;

import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("financial-registers")
public class FinancialRegistersController {

    @Autowired
    private FinancialRegistersService financialRegistersService;
    @Autowired
    private FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper;
    @Autowired
    private FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid FinancialRegistersCreateDTO data, @AuthenticationPrincipal User user){
        var financialRegisterEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        FinancialRegisters saved = financialRegistersService.createFinancRegister(financialRegisterEntity, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/list")
    public ResponseEntity list(@AuthenticationPrincipal User user){
        var listOfRegister = financialRegistersService.listFinancRegistersByUserId(user);
        var listOfRegisterDTOResponse = financialRegisterResponseDTOMapper.financialRegistersResponseDTOList(listOfRegister);

        return ResponseEntity.ok().body(listOfRegisterDTOResponse);
    }

    @PutMapping("/update/{id}")
    @PermitAll // ou @PreAuthorize("permitAll()")
    public ResponseEntity update(@RequestBody @Valid FinancialRegistersCreateDTO data, @PathVariable("id") Long id, @AuthenticationPrincipal User user){
        var registryToEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        var registryUpdated = financialRegistersService.updateFinancRegisterById(registryToEntity, id,user);

        return ResponseEntity.status(HttpStatus.OK).body(registryUpdated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long idForDelete){
        financialRegistersService.deleteRegisterById(idForDelete);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
