package com.zenifinance.core.repository;

import com.zenifinance.core.dto.CategoryResumeDTO;
import com.zenifinance.core.dto.FinancialRegisterResumeDTO;
import com.zenifinance.core.dto.MonthResumeInvestmentDTO;
import com.zenifinance.core.entity.FinancialRegisters;
import com.zenifinance.core.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinancialRegistersRepository extends JpaRepository<FinancialRegisters, Long> {
    List<FinancialRegisters> findByIdUser(User user);

    @Query(value = """
            SELECT
                  CAST(SUM(CASE WHEN type_register = 'RECEITA' THEN value ELSE 0 END) AS DOUBLE PRECISION) AS sumEntry,
                  CAST(SUM(CASE WHEN type_register = 'DESPESA' THEN value ELSE 0 END) AS DOUBLE PRECISION) AS sumExit,
                  CAST(SUM(CASE WHEN type_register = 'RECEITA' THEN value ELSE -value END) AS DOUBLE PRECISION) AS balanceNow
                    FROM financial_registers
                    WHERE id_user = :userId
            """, nativeQuery = true)
    FinancialRegisterResumeDTO findFinancialRegisterResumeByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT 
            fr.category AS category,
            SUM(fr.value) AS total_value,
            TO_CHAR(fr.date_register, 'Mon') AS mes,
            EXTRACT(YEAR FROM fr.date_register) AS ano
        FROM financial_registers fr
        WHERE fr.type_register = 'DESPESA'
          AND fr.id_user = :userId
        GROUP BY 
            fr.category,
            TO_CHAR(fr.date_register, 'Mon'),
            EXTRACT(YEAR FROM fr.date_register),
            EXTRACT(MONTH FROM fr.date_register)
        ORDER BY
            EXTRACT(YEAR FROM fr.date_register),
            EXTRACT(MONTH FROM fr.date_register)
    """, nativeQuery = true)
    List<Object[]> findCategoryResumeByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT 
            EXTRACT(YEAR FROM date_register) AS ano,
            TO_CHAR(date_register, 'Mon') AS mes,
            SUM(CASE WHEN type_register = 'DESPESA' THEN value ELSE 0 END) AS despesas,
            SUM(CASE WHEN type_register = 'RECEITA' THEN value ELSE 0 END) AS receitas
        FROM financial_registers
        WHERE id_user = :userId
        GROUP BY 
            EXTRACT(YEAR FROM date_register),
            TO_CHAR(date_register, 'Mon'),
            EXTRACT(MONTH FROM date_register)
        ORDER BY 
            EXTRACT(YEAR FROM date_register),
            EXTRACT(MONTH FROM date_register)
    """, nativeQuery = true)
    List<Object[]> findMonthResumeByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT
            TO_CHAR(date_register, 'Mon') AS mes,
            EXTRACT(YEAR FROM date_register) AS ano,
            SUM(CASE WHEN type_register = 'DESPESA' THEN value ELSE 0 END) AS total_aportes,
            SUM(CASE WHEN type_register = 'RECEITA' THEN value ELSE 0 END) AS total_resultados
        FROM financial_registers
        WHERE id_user = :userId
          AND category = 'INVESTIMENTOS'
        GROUP BY 
            EXTRACT(YEAR FROM date_register),
            EXTRACT(MONTH FROM date_register),
            TO_CHAR(date_register, 'Mon')
        ORDER BY 
            EXTRACT(YEAR FROM date_register),
            EXTRACT(MONTH FROM date_register)
    """, nativeQuery = true)
    List<Object[]> findMonthResumeInvestByUserId(@Param("userId") Long userId);

    Page<FinancialRegisters> findByIdUser(User user, Pageable pageable);

}
