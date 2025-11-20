import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { ArrowUpRight, ArrowDownRight, PiggyBank, Clock } from "lucide-react";

import ChatRegisterCard from "../../components/ChatRegisterCard.jsx";
import ManualRegisterCard from "../../components/ManualRegisterCard.jsx";
import HistoryTableCard from "../../components/HistoryTableCard.jsx";
import FilterCard from "../../components/FilterCard.jsx";

import MOCK_CATEGORIES from "../../utils/mock_category.js";
import MOCK_MONTHLY_RESUME from "../../utils/mock_mouth.js";
import MOCK_INVESTMENTS from "../../utils/mock_investiments.js";
import MOCK_HISTORY from "../../utils/mock_historic.js";

export default function FinancialRegisters() {
  const columns = ["Categoria", "Valor", "Data"];

  const data = [
    ["Alimentação", "R$ 52,00", "10/11/2025"],
    ["Transporte", "R$ 18,00", "11/11/2025"],
    ["Lazer", "R$ 80,00", "12/11/2025"],
  ];

  return (
    <DashboardLayout>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <ChatRegisterCard/>

        <ManualRegisterCard/>

        <div style={{ marginBottom: "5px" }}>
                <FilterCard />
        </div>

        <HistoryTableCard
          data={MOCK_HISTORY}
          onEdit={(row) => console.log("Editar", row)}
          onDelete={(id) => console.log("Deletar", id)}
        />
      </div>

    </DashboardLayout>
  );
}