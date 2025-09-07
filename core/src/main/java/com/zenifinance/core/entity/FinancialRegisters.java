package com.zenifinance.core.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "FinancialRegisters")
public class FinancialRegisters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Float value;

    @Column(nullable = false)
    private String typeRegister;

    @Column(nullable = false)
    private Date dateRegister;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "fk_financial_register_user"))
    private User idUser;

    @Column(nullable = false)
    private LocalDateTime dateCreateRegister;
}
