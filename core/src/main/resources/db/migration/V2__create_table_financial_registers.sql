<<<<<<< HEAD
CREATE TABLE financial_registers(
=======
CREATE TABLE IF NOT EXISTS financial_registers(
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  type_register VARCHAR(50) NOT NULL,
  date_register DATE NOT NULL,
<<<<<<< HEAD
  id_user BIGINT NOT NULL,
=======
  id_user INTEGER NOT NULL,
>>>>>>> 560cc00 (feat: Criação do Módulo de IA e ferramentas, Criação do endpoint para N8N)
  date_create_register DATE NOT NULL,
  CONSTRAINT fk_financial_register_user
    FOREIGN KEY (id_user) REFERENCES users(id)
)