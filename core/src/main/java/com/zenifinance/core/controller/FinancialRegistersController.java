package com.zenifinance.core.controller;

import com.zenifinance.core.dto.*;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/financial-registers")
public class FinancialRegistersController {

    private final FinancialRegistersService financialRegistersService;
    private final FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper;
    private final FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper;
    private final FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper;
    private final ZeniAIToolsService zeniAIToolsService;

    public FinancialRegistersController(
            FinancialRegistersService financialRegistersService,
            FinancialRegistersCreateDTOMapper financialRegistersCreateDTOMapper,
            FinancialRegisterResponseDTOMapper financialRegisterResponseDTOMapper,
            FinancialRegisterCreateFromN8NDTOMapper financialRegisterCreateFromN8NDTOMapper,
            ZeniAIToolsService zeniAIToolsService
    ){
        this.financialRegistersService = financialRegistersService;
        this.financialRegistersCreateDTOMapper = financialRegistersCreateDTOMapper;
        this.financialRegisterResponseDTOMapper = financialRegisterResponseDTOMapper;
        this.financialRegisterCreateFromN8NDTOMapper = financialRegisterCreateFromN8NDTOMapper;
        this.zeniAIToolsService = zeniAIToolsService;
    }

    // ===== CREATES ========


    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FinancialRegistersResponseDTO> create(@RequestBody @Valid FinancialRegistersCreateDTO data, @AuthenticationPrincipal User user){
        FinancialRegisters entity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        FinancialRegisters saved = financialRegistersService.createRegister(entity, user);
        FinancialRegistersResponseDTO dto = financialRegisterResponseDTOMapper.financialRegistersToDTO(saved);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/create/ia")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FinancialRegistersResponseDTO>> createWithAI(@RequestBody String userMessageRegister, @AuthenticationPrincipal User user) throws ParseException {
        List<FinancialRegistersCreateDTO> parseDtos = zeniAIToolsService.categorizeWithOpenAi(userMessageRegister);
        if (parseDtos.isEmpty()) {
            return ResponseEntity.badRequest().body(List.of());
        }
        List<FinancialRegistersResponseDTO> responses = parseDtos.stream().map(dto -> {
            FinancialRegisters saved = financialRegistersService.createRegister(financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(dto), user);
                    return financialRegisterResponseDTOMapper.financialRegistersToDTO(saved);
                })
                .toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(responses);
    }

    @PostMapping("/create/whats")
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

    // ===== READS ========

    @GetMapping("/list")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FinancialRegistersResponseDTO>> list(@AuthenticationPrincipal User user){
        List<FinancialRegisters> list = financialRegistersService.listFinancRegistersByUserId(user);
        List<FinancialRegistersResponseDTO> dtos = financialRegisterResponseDTOMapper.financialRegistersResponseDTOList(list);
        return ResponseEntity.ok().body(dtos);
    }

    @GetMapping("/list/paged")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<FinancialRegistersResponseDTO>> list(@AuthenticationPrincipal User user, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateRegister").descending());
        Page<FinancialRegisters> registersPage = financialRegistersService.listFinancRegistersByUserId(user, pageable);
        Page<FinancialRegistersResponseDTO> dtoPage = registersPage.map(financialRegisterResponseDTOMapper::financialRegistersToDTO);
        return ResponseEntity.ok(dtoPage);
    }


    @GetMapping("/resumeCards")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FinancialRegisterResumeDTO> getUserResume(@AuthenticationPrincipal User user){
        FinancialRegisterResumeDTO dtoResume = financialRegistersService.getResumeRegister(user);
        return ResponseEntity.ok().body(dtoResume);
    }

    @GetMapping("/categoryresume")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CategoryResumeDTO>> getCategoryResume(@AuthenticationPrincipal User user){
        List<CategoryResumeDTO> listCategoryResume = financialRegistersService.getCategoryResume(user.getId());
        return ResponseEntity.ok(listCategoryResume);
    }

    @GetMapping("/monthresume")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<MonthResumeDTO>> getMouthResume(@AuthenticationPrincipal User user){
        List<MonthResumeDTO> listMouthResume = financialRegistersService.getMonthResume(user.getId());
        return ResponseEntity.ok(listMouthResume);
    }

    @GetMapping("/monthresumeinvest")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<MonthResumeInvestmentDTO>> getMonthResumeInvest(@AuthenticationPrincipal User user){
        List<MonthResumeInvestmentDTO> listMonInvest = financialRegistersService.getMonthResumeInvestment(user.getId());
        return ResponseEntity.ok(listMonInvest);
    }

    // ===== UPDATE ========

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FinancialRegistersResponseDTO> update(@RequestBody @Valid FinancialRegistersCreateDTO data, @PathVariable("id") Long id, @AuthenticationPrincipal User user){
        var registryToEntity = financialRegistersCreateDTOMapper.financialRegistersCreateDTOToEntity(data);
        var registryUpdated = financialRegistersService.updateRegisterById(registryToEntity, id,user);
        FinancialRegistersResponseDTO financialDTOResponseUPDTReturn = financialRegisterResponseDTOMapper.financialRegistersToDTO(registryUpdated);

        return ResponseEntity.ok(financialDTOResponseUPDTReturn);
    }

    // ===== DELETE ========

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable("id") Long idForDelete){
        financialRegistersService.deleteRegisterById(idForDelete);
        return ResponseEntity.noContent().build();
    }


}
