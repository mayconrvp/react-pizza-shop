import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import colors from 'tailwindcss/colors'

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid
} from 'recharts'

const data = [
  { date: '10/01', revenue: 1200 },
  { date: '11/01', revenue: 1645 },
  { date: '12/01', revenue: 841.69 },
  { date: '13/01', revenue: 1350 },
  { date: '14/01', revenue: 988.90 },
  { date: '15/01', revenue: 1110 },
  { date: '16/01', revenue: 1450 },
]


export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>

        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" dy={10} />


            <YAxis 
              stroke="#888" 
              axisLine={false} 
              tickLine={false} 
              width={80}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line 
              type="linear" 
              strokeWidth={2} 
              dataKey="revenue" 
              stroke={colors['violet']['500']}
            />

          </LineChart>

        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}