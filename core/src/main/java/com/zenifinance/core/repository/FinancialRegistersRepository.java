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
    List<FinancialRegisters> findByidUser (User user);

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
            SELECT new com.zenifinance.core.dto.CategoryResumeDTO(fr.category, SUM(fr.value))
            FROM FinancialRegisters fr
            WHERE fr.typeRegister = 'DESPESA' AND fr.idUser.id = :userId
            GROUP BY fr.category
            """)
    List<CategoryResumeDTO> findCategoryResumeByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT 
            TO_CHAR(date_register, 'Mon') AS mes,
            SUM(CASE WHEN type_register = 'DESPESA' THEN value ELSE 0 END) AS despesas,
            SUM(CASE WHEN type_register = 'RECEITA' THEN value ELSE 0 END) AS receitas
        FROM financial_registers
        WHERE id_user = :userId
        GROUP BY TO_CHAR(date_register, 'Mon'), EXTRACT(MONTH FROM date_register)
        ORDER BY EXTRACT(MONTH FROM date_register)
    """, nativeQuery = true)
    List<Object[]> findMonthResumeByUserId(@Param("userId") Long userId);

    @Query(value = """
        SELECT
            category,
            CAST(SUM(value) AS DOUBLE PRECISION) AS valor_investido,
            TO_CHAR(date_register, 'Mon') AS mes
        FROM financial_registers
        WHERE id_user = :userId 
          AND category = 'INVESTIMENTOS' 
          AND type_register = 'RECEITA'
        GROUP BY category, TO_CHAR(date_register, 'Mon'), EXTRACT(MONTH FROM date_register)
        ORDER BY EXTRACT(MONTH FROM date_register)
    """, nativeQuery = true)
    List<MonthResumeInvestmentDTO> findMonthResumeInvestByUserId(@Param("userId") Long userId);

    Page<FinancialRegisters> findByidUser(User user, Pageable pageable);
}
