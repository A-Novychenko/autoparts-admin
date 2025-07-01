/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { BarChart } from '@mui/x-charts';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { useRef, useState, useLayoutEffect } from 'react';

const balanceSheet = [
  {
    year: '2021',
    currAss: 100,
    nCurrAss: 50,
    curLia: 70,
    nCurLia: 30,
    capStock: 60,
    retEarn: 40,
    treas: -10,
  },
  {
    year: '2022',
    currAss: 120,
    nCurrAss: 60,
    curLia: 80,
    nCurLia: 40,
    capStock: 70,
    retEarn: 50,
    treas: -20,
  },
  {
    year: '2023',
    currAss: 140,
    nCurrAss: 70,
    curLia: 90,
    nCurLia: 50,
    capStock: 80,
    retEarn: 60,
    treas: -30,
  },
];

const profitData = [
  { year: '2021', gross: 80, net: 40 },
  { year: '2022', gross: 90, net: 50 },
  { year: '2023', gross: 100, net: 60 },
];

const cashFlowData = [
  { year: '2021', inflow: 110, outflow: 60 },
  { year: '2022', inflow: 130, outflow: 70 },
  { year: '2023', inflow: 140, outflow: 80 },
];

const addLabels = (series: any[]) =>
  series.map(s => ({ ...s, label: s.label || s.dataKey }));

function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setWidth(element.offsetWidth);
    });

    resizeObserver.observe(element);
    setWidth(element.offsetWidth);

    return () => resizeObserver.disconnect();
  }, []);

  return { ref, width };
}

export default function DashboardPage() {
  const balanceSize = useContainerSize();
  const profitSize = useContainerSize();
  const cashSize = useContainerSize();

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        p: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Финансовый отчёт
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Paper sx={{ p: 3 }} ref={balanceSize.ref}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Балансовая структура по годам
          </Typography>
          <BarChart
            height={360}
            width={balanceSize.width}
            dataset={balanceSheet}
            series={addLabels([
              {
                dataKey: 'currAss',
                stack: 'assets',
                label: 'Оборотные активы',
              },
              {
                dataKey: 'nCurrAss',
                stack: 'assets',
                label: 'Внеоборотные активы',
              },
              {
                dataKey: 'curLia',
                stack: 'liability',
                label: 'Краткосрочные обязательства',
              },
              {
                dataKey: 'nCurLia',
                stack: 'liability',
                label: 'Долгосрочные обязательства',
              },
              {
                dataKey: 'capStock',
                stack: 'equity',
                label: 'Уставной капитал',
              },
              {
                dataKey: 'retEarn',
                stack: 'equity',
                label: 'Нераспределённая прибыль',
              },
              { dataKey: 'treas', stack: 'equity', label: 'Собственные акции' },
            ])}
            xAxis={[{ dataKey: 'year', label: 'Год' }]}
            yAxis={[{ label: 'Сумма, тыс. грн', width: 80 }]}
            grid={{ horizontal: true }}
          />
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }} ref={profitSize.ref}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Прибыль (брутто / нетто)
              </Typography>
              <BarChart
                height={300}
                width={profitSize.width}
                dataset={profitData}
                series={addLabels([
                  { dataKey: 'gross', label: 'Валовая прибыль' },
                  { dataKey: 'net', label: 'Чистая прибыль' },
                ])}
                xAxis={[{ dataKey: 'year', label: 'Год' }]}
                yAxis={[{ label: 'тыс. грн', width: 80 }]}
                grid={{ horizontal: true }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }} ref={cashSize.ref}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Денежный поток (поступление / расход)
              </Typography>
              <BarChart
                height={300}
                width={cashSize.width}
                dataset={cashFlowData}
                series={addLabels([
                  { dataKey: 'inflow', label: 'Поступления' },
                  { dataKey: 'outflow', label: 'Расходы' },
                ])}
                xAxis={[{ dataKey: 'year', label: 'Год' }]}
                yAxis={[{ label: 'тыс. грн', width: 80 }]}
                grid={{ horizontal: true }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
