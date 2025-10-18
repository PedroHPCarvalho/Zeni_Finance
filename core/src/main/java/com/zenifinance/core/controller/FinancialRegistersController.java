package com.zenifinance.core.controller;

import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
<<<<<<< HEAD
import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.FinancialRegisterResponseDTOMapper;
import com.zenifinance.core.mapper.FinancialRegistersCreateDTOMapper;
import com.zenifinance.core.service.FinancialRegistersService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.zenifinance.core.dto.FinancialRegistersFromN8NRawDTO;
import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import com.zenifinance.core.mapper.FinancialRegisterCreateFromN8NDTOMapper;
import com.zenifinance.core.mapper.FinancialRegisterResponseDTOMapper;
import com.zenifinance.core.mapper.FinancialRegistersCreateDTOMapper;
import com.zenifinance.core.service.FinancialRegistersService;
import com.zenifinance.core.service.ZeniAIToolsService;
import com.zenifinance.core.util.JsonUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
=======
import java.text.ParseException;
import java.util.List;

>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
@RestController
@RequestMapping("financial-registers")
public class FinancialRegistersController {

    private final FinancialRegistersService financialRegistersService;
    private final FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper;
    private final FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper;
<<<<<<< HEAD
=======
    private final FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper;
    private final ZeniAIToolsService zeniAIToolsService;
    private final JsonUtils jsonUtils;
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)

    public FinancialRegistersController(
            FinancialRegistersService financialRegistersService,
            FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper,
<<<<<<< HEAD
            FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper
=======
            FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper,
            FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper,
            ZeniAIToolsService zeniAIToolsService,
            JsonUtils jsonUtils
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
    ){
        this.financialRegistersService = financialRegistersService;
        this.financialRegistersCreateDTOMapper = financialRegistersCreateDTOMapper;
        this.financialRegisterResponseDTOMapper = financialRegisterResponseDTOMapper;
<<<<<<< HEAD
=======
        this.financialRegisterCreateFromN8NDTOMapper = financialRegisterCreateFromN8NDTOMapper;
        this.zeniAIToolsService = zeniAIToolsService;
        this.jsonUtils = jsonUtils;
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
    }

    @PostMapping("/")
    public ResponseEntity<FinancialRegistersResponseDTO> create(@RequestBody @Valid FinancialRegistersCreateDTO data, @AuthenticationPrincipal User user){
        var financialRegisterEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        FinancialRegisters saved = financialRegistersService.createRegister(financialRegisterEntity, user);
        FinancialRegistersResponseDTO financialDTOReturned = financialRegisterResponseDTOMapper.financialRegistersToDTO(saved);

        return ResponseEntity.status(HttpStatus.CREATED).body(financialDTOReturned);
    }

<<<<<<< HEAD
=======
    @PostMapping("/aiCreate")
    public ResponseEntity<List<FinancialRegistersResponseDTO>> createWithAI(@RequestBody String userMessageRegisters, @AuthenticationPrincipal User user) throws ParseException {
       List<FinancialRegistersCreateDTO> dtosReturned  = zeniAIToolsService.categorizeWithOpenAi(userMessageRegisters);
       List<FinancialRegistersResponseDTO> dtoListToResponseDTO = new java.util.ArrayList<>();
       for(FinancialRegistersCreateDTO dto: dtosReturned){
           FinancialRegisters saved = financialRegistersService.createRegister(financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(dto),user);
           dtoListToResponseDTO.add(financialRegisterResponseDTOMapper.financialRegistersToDTO(saved));
       }
       return ResponseEntity.ok(dtoListToResponseDTO);
    }

    @PostMapping("/createFromWhats")
    public ResponseEntity<FinancialRegistersResponseDTO> createWithWhats(@RequestBody @Valid FinancialRegistersFromN8NRawDTO data, HttpServletRequest request){
        String key = request.getHeader("Api-Key");
        if (key == null || !key.equals("cnuiredhagujnhsdujaBASHd-563498651465")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        FinancialRegisters dtosValidated = financialRegistersService.financialRegistersCreateFromWhats(data);
        FinancialRegisters save = financialRegistersService.createRegister(dtosValidated,dtosValidated.getIdUser());
        FinancialRegistersResponseDTO returnDTO = financialRegisterResponseDTOMapper.financialRegistersToDTO(save);

        return ResponseEntity.ok().body(returnDTO);
    }

>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
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
