import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { titleCase } from '../../utils/format';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e', '#84cc16'];

export default function FacilityPieChart({ data = [], height = 280 }) {
  const { isDark } = useTheme();
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const chartData = data.map((d) => ({
    name: titleCase(d.facility || ''),
    value: d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={92} paddingAngle={2}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: isDark ? '#16213a' : '#ffffff',
            border: `1px solid ${isDark ? '#22304d' : '#e2e8f0'}`,
            borderRadius: 12,
            fontSize: 13,
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: 12, color: textColor }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
