CREATE TABLE IF NOT EXISTS financial_registers (
  id BIGSERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  type_register VARCHAR(50) NOT NULL,
  date_register DATE NOT NULL,
  id_user BIGINT NOT NULL,
  date_create_register DATE NOT NULL,
  CONSTRAINT fk_financial_register_user
    FOREIGN KEY (id_user) REFERENCES users(id)
);
