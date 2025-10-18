package com.zenifinance.core.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zenifinance.core.dto.FinancialRegistersCreateDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Converte uma string JSON em um objeto da classe especificada.
     */
    public static <T> T fromJson(String jsonString, Class<T> clazz) {
        try {
            return objectMapper.readValue(jsonString, clazz);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter o JSON para objeto: " + clazz.getSimpleName(), e);
        }
    }

    /**
     * Converte um objeto Java em uma string JSON.
     */
    public static String toJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter objeto para JSON", e);
        }
    }

    /**
     * Verifica se uma string é um JSON válido.
     */
    public static boolean isValidJson(String jsonString) {
        try {
            objectMapper.readTree(jsonString);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Converte uma string JSON representando uma lista para uma lista de objetos do tipo especificado.
     */
    public static <T> List<T> fromJsonToList(String json, Class<T> clazz) {
        try {
            return objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter JSON para lista de " + clazz.getSimpleName(), e);
        }
    }

    // Métodos desnecessários foram removidos
}
