import sys
from openai import AzureOpenAI
from datetime import date

sys.stdout.reconfigure(encoding="utf-8")


endpoint = "https://pedro-m9q6097t-eastus2.cognitiveservices.azure.com/"
model_name = "gpt-4o-mini"
deployment = "gpt-4o-mini"

subscription_key = ""
api_version = "2024-12-01-preview"

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key
)


def go_ia(message):
    hoje = date.today() 
    response = client.chat.completions.create(
        messages=[
            {
              "role": "system",
              "content": f"Extract JSON with fields: 'date' (use the date in the input, if none, use today's date {hoje} in YYYY-MM-DD format), 'amount', 'description', 'type_register' (classify as \"saída\" for expenses or \"entrada\" for income), and 'category' (choose from ['Alimentação', 'Transporte', 'Moradia', 'Serviços', 'Compras', 'Saúde', 'Entretenimento', 'Educação', 'Jogos de Azar e Cassino', 'Viagem', 'Finanças', 'Outros']; if gambling is mentioned, use 'Jogos e Cassino'). Do not invent or change dates. Always return valid JSON. If extraction fails, return: {{\"error\": \"...\"}}",
            },
            {
                "role": "user",
                "content": f"{message}",
            }
        ],
        max_tokens=1024,
        temperature=1.0,
        top_p=1.0,
        model=deployment
    )
    return response