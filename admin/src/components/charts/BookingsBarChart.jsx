import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

export default function BookingsBarChart({ data = [], dataKey = 'bookings', height = 280 }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#22304d' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: isDark ? '#16213a' : '#ffffff',
            border: `1px solid ${gridColor}`,
            borderRadius: 12,
            fontSize: 13,
          }}
          labelStyle={{ color: textColor }}
          cursor={{ fill: isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)' }}
        />
        <Bar dataKey={dataKey} fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
