package com.zenifinance.core.service;

import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
import com.zenifinance.core.dto.FinancialRegistersResponseDTO;
import com.zenifinance.core.util.CategorysEnum;
import com.zenifinance.core.util.JsonUtils;
import com.zenifinance.core.util.TypeRegisters;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ZeniAIToolsService {

    private final OpenAIService openAIService;
    private final JsonUtils jsonUtils;

    public ZeniAIToolsService(
            OpenAIService openAIService,
            JsonUtils jsonUtils
    ){
        this.openAIService = openAIService;
        this.jsonUtils = jsonUtils;
    }

    public List<FinancialRegistersCreateDTO> categorizeWithOpenAi (String userString) throws ParseException {
        ZoneId zone = ZoneId.of("America/Sao_Paulo");
        String dataAtual = LocalDate.now(zone).format(DateTimeFormatter.ISO_DATE);
        List<ChatRequestMessage> listRequestForOpenAi = openAIService.requestOpenAiMessages(
                        """
                        Analise o texto fornecido e gere APENAS um JSON válido conforme o DTO FinancialRegistersCreateDTO.
                        
                        Restrições:
                        - Não adicione texto, comentários ou explicações.
                        - Use apenas as chaves exigidas.
                        - Use aspas duplas em todas as strings.
                        - Leve em consideração esta data como atual: %s 
                        - Deve retornar como uma Lista, mesmo que seja um registro somente
                        - Se Não for possivel realiar as tarefas retorne um json dizendo que não é possivel extrair
                        
                        Formato esperado:
                        [
                            {
                              "description": "<descrição>",
                              "category": "<categoria>",
                              "value": <valor numérico>,
                              "typeRegister": "<Despesa ou Receita>",
                              "dateRegister": "<data no formato yyyy-MM-dd>"
                            }
                        ]
                        
                        Categorias permitidas:
                        ALIMENTACAO, TRANSPORTE, MORADIA, SAUDE, EDUCACAO,
                        LAZER_E_ENTRETENIMENTO, BETS_E_JOGOS_DE_AZAR, VESTUARIO,
                        SERVICOS, IMPOSTOS_E_TAXAS, SALARIO, FREELANCE_E_SERVICOS_PRESTADOS,
                        INVESTIMENTOS, PRESENTES_E_DOACOES_RECEBIDAS, REEMBOLSOS_E_RESTITUICOES
                        
                        Tipos de registro permitidos:
                        DESPESA, RECEITA
                        
                        Regras adicionais:
                        - dateRegister deve seguir o formato yyyy-MM-dd; se ausente, use a data atual.
                        - category e typeRegister DEVEM ser exatamente iguais a uma das opções acima.
                        
                        Exemplo de resposta:
                        [
                            {
                              "description": "Compra de lanche no iFood",
                              "category": "ALIMENTACAO",
                              "value": 39.0,
                              "typeRegister": "DESPESA",
                              "dateRegister": "2025-10-04"
                            }
                        ]
                        
                        Exemplo de resposta em caso de erro ou não conseguir:
                        [
                            {
                                "error":"N"
                            }
                        ]
                        """.formatted(dataAtual),
                        userString
        );


        ChatCompletions chatCompletions = openAIService.generateResponseChatCompletion(listRequestForOpenAi);
        String aiResponse = openAIService.getMessageContentToString(chatCompletions);

        // Lista para todos os registros válidos
        List<FinancialRegistersCreateDTO> validDtos = new ArrayList<>();

        if (JsonUtils.isValidJson(aiResponse) && !aiResponse.contains("\"error\"")){
            //Converte JSON em lista
            List<FinancialRegistersCreateDTO> allDtos = JsonUtils.fromJsonToList(aiResponse, FinancialRegistersCreateDTO.class);

            //Valida cada registro
            for(FinancialRegistersCreateDTO dto: allDtos){
                if (dto.getDescription() == null || dto.getDescription().isEmpty()) continue;
                if (dto.getCategory() == null || dto.getCategory().isEmpty() || !CategorysEnum.isValid(dto.getCategory().toUpperCase())) continue;
                if (dto.getValue() == null || dto.getValue() <= 0) continue;
                if (dto.getTypeRegister() == null || dto.getTypeRegister().isEmpty() || !TypeRegisters.isValid(dto.getTypeRegister().toUpperCase())) continue;
                if (dto.getDateRegister() == null) continue;

                validDtos.add(dto);
            }
        } else {
            // Caso de erro ou JSON inválido
            System.out.println("{\"error\":\"Não foi possível extrair\"}");
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        for(FinancialRegistersCreateDTO dto : validDtos){
            if (dto.getDateRegister() != null){
                String dataFormated = formatter.format(dto.getDateRegister());
                dto.setDateRegister(formatter.parse(dataFormated));
            }
        }

        return validDtos;
    }
}
