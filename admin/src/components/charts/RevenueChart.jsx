import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency } from '../../utils/format';

export default function RevenueChart({ data = [], dataKey = 'revenue', height = 280 }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#22304d' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis
          tick={{ fill: textColor, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? '#16213a' : '#ffffff',
            border: `1px solid ${gridColor}`,
            borderRadius: 12,
            fontSize: 13,
          }}
          labelStyle={{ color: textColor }}
          formatter={(value) => [formatCurrency(value), 'Revenue']}
        />
        <Area type="monotone" dataKey={dataKey} stroke="#3b82f6" strokeWidth={2.5} fill="url(#revenueFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
