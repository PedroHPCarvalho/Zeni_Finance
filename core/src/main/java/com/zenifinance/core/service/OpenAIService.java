package com.zenifinance.core.service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import net.minidev.json.JSONUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public final class OpenAIService {
    //  Define dados para conectar a API do GPT-OPENI

    private final String apiKey;
    private final String endpoint;
    private final String deploymentName;
    private OpenAIClient openAIClient;

    public OpenAIService(
            @Value("${azure.openai.chatgpt.key}")
            String key,
            @Value("${azure.openai.chatgpt.endpoint}")
            String endpoint,
            @Value("${azure.openai.chatgpt.deploymentName}")
            String deploymentName
    ){
        this.apiKey = key;
        this.endpoint = endpoint;
        this.deploymentName = deploymentName;
        this.openAIClient = new OpenAIClientBuilder()
                .credential(new AzureKeyCredential(key))
                .endpoint(endpoint)
                .buildClient();
    }

    public List<ChatRequestMessage> requestOpenAiMessages(String prompt, String messageForChat){
        List<ChatRequestMessage> chatMessages = Arrays.asList(
                new ChatRequestSystemMessage(prompt),
                new ChatRequestUserMessage(messageForChat)
        );
        return chatMessages;
    }

    public ChatCompletions generateResponseChatCompletion(List<ChatRequestMessage> chatMessages){
        ChatCompletionsOptions chatCompletionsOptions = new ChatCompletionsOptions(chatMessages)
                .setMaxTokens(13107)
                .setTemperature(1d)
                .setTopP(1d)
                .setFrequencyPenalty(0d)
                .setPresencePenalty(0d);

        ChatCompletions chatCompletions = openAIClient.getChatCompletions(deploymentName,chatCompletionsOptions);
        return chatCompletions;
    }

    public String getMessageContentToString(ChatCompletions chatCompletions){
        String responseMessageOpenAIContent = "";
        for (ChatChoice choice : chatCompletions.getChoices()){
            ChatResponseMessage responseMessageOpenAI = choice.getMessage();
            responseMessageOpenAIContent = responseMessageOpenAI.getContent();
        }
        return responseMessageOpenAIContent;
    }
}


