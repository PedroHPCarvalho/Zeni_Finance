# Imagem base Python
FROM python:3.12-slim

# Diretório de trabalho
WORKDIR /app

# Copia e instala dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY . .

# Copia script de inicialização
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Variável de ambiente
ENV DJANGO_SETTINGS_MODULE=webapp.settings
ENV PYTHONUNBUFFERED=1

# Porta exposta
EXPOSE 8000

# Comando de inicialização
CMD ["/start.sh"]
