import React, { useMemo } from "react";
import { Trophy } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import styles from "../styles/Card/TopCategoriesCard.module.css";

export default function TopCategoriesCard({ title, data = [], type = "DESPESA", filterMonth = null, filterYear = null }) {

  const aggregated = useMemo(() => {
    if (!data || data.length === 0) return [];

    const filteredData = data.filter(item => {
      if (filterMonth && filterYear) {
        return item.mes === filterMonth && item.ano === filterYear;
      }
      return true;
    });

    const grouped = filteredData.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = 0;
      acc[key] += item.total;
      return acc;
    }, {});

    return Object.keys(grouped).map(category => ({
      category,
      total: grouped[category],
    }));
  }, [data, filterMonth, filterYear]);

  const total = aggregated.reduce((sum, item) => sum + item.total, 0);
  const typeColors = { DESPESA: "#F44336", RECEITA: "#4CAF50", INVESTIMENTO: "#2196F3" };
  const color = typeColors[type.toUpperCase()] || "#999";

  const sorted = [...aggregated].sort((a, b) => b.total - a.total);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.children}>
        <div className={styles.list}>
          {sorted.map((item, index) => {
            const percent = total > 0 ? (item.total / total) * 100 : 0;
            return (
              <div key={index} className={`${styles.item} ${index === 0 ? styles.firstItem : ""}`}>
                <div className={styles.rankWrapper}>
                  {index === 0 ? <Trophy className={styles.gold} /> :
                   index === 1 ? <Trophy className={styles.silver} /> :
                   index === 2 ? <Trophy className={styles.bronze} /> :
                   <span className={styles.rank}>#{index + 1}</span>}
                </div>

                <div className={styles.miniDonut}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: percent }, { value: 100 - percent }]}
                        innerRadius="55%"
                        outerRadius="100%"
                        dataKey="value"
                      >
                        <Cell fill={color} />
                        <Cell fill="#eee" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <span className={styles.percentLabel}>{percent.toFixed(0)}%</span>
                </div>

                <div className={styles.info}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.value}>
                    R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
