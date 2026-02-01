'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Chrome', count: 2400 },
    { name: 'Safari', count: 1398 },
    { name: 'Firefox', count: 980 },
    { name: 'Edge', count: 308 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#f59e0b', '#10b981'];

export default function BrowsersChart() {
    return (
        <div className="w-full h-full p-5 flex flex-col">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Browsers</h3>
            <div className="flex-1 min-h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            stroke="var(--text-secondary)"
                            fontSize={12}
                            width={70}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontWeight: 500 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                borderRadius: '8px'
                            }}
                            cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                        />
                        <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
