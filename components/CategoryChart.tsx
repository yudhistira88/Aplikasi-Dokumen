import React, { useEffect, useRef } from 'react';
import { Category, DocumentData } from '../types';

// Let TypeScript know that Chart.js is available globally
declare const Chart: any;

interface CategoryChartProps {
  data: DocumentData;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const amounts = {
      [Category.REIMBURSE]: data[Category.REIMBURSE].reduce((sum, item) => sum + item.amount, 0),
      [Category.UM]: data[Category.UM].reduce((sum, item) => sum + item.amount, 0),
      [Category.TTDS]: data[Category.TTDS].reduce((sum, item) => sum + item.amount, 0),
    };

    const chartData = {
      labels: [Category.REIMBURSE, Category.UM, Category.TTDS],
      datasets: [
        {
          label: 'Total Amount (Rp)',
          data: [amounts.REIMBURSE, amounts.UM, amounts.TTDS],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',  // blue-500
            'rgba(234, 179, 8, 0.7)',   // yellow-500
            'rgba(139, 92, 246, 0.7)',  // violet-500
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(139, 92, 246, 1)',
          ],
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = chartData;
      chartInstanceRef.current.update();
    } else {
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Jumlah per Kategori',
              font: {
                size: 18,
                weight: '600',
              },
              color: '#334155', // slate-700
              padding: {
                bottom: 20,
              },
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value: number) {
                   if (value >= 1e6) {
                    return `Rp ${(value / 1e6)} Jt`;
                   }
                   return `Rp ${value}`;
                }
              }
            },
          },
        },
      });
    }
     // Cleanup on unmount
    return () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
            chartInstanceRef.current = null;
        }
    };
  }, [data]);

  return (
    <div className="bg-white/70 p-4 rounded-xl shadow-lg shadow-slate-200/50 h-80">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CategoryChart;
