package com.zenifinance.core.repository;

import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FinancialRegistersRepository extends JpaRepository<FinancialRegisters, Long> {
    List<FinancialRegisters> findByidUser (User user);
}
