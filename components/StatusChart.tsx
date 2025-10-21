import React, { useEffect, useRef } from 'react';
import { Status, DocumentData } from '../types';

// Let TypeScript know that Chart.js is available globally
declare const Chart: any;

interface StatusChartProps {
  data: DocumentData;
}

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const allDocuments = Object.values(data).flat();
    
    const statusCounts = {
      [Status.ACCEPTED]: allDocuments.filter(d => d.status === Status.ACCEPTED).length,
      [Status.REJECTED]: allDocuments.filter(d => d.status === Status.REJECTED).length,
      [Status.PENDING]: allDocuments.filter(d => d.status === Status.PENDING).length,
    };

    const chartData = {
      labels: ['Diterima', 'Ditolak', 'Pending'],
      datasets: [
        {
          label: 'Jumlah Dokumen',
          data: [statusCounts.ACCEPTED, statusCounts.REJECTED, statusCounts.PENDING],
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',  // emerald-500
            'rgba(244, 63, 94, 0.8)',   // rose-500
            'rgba(245, 158, 11, 0.8)',  // amber-500
          ],
          borderColor: [
            '#ffffff',
            '#ffffff',
            '#ffffff',
          ],
          borderWidth: 2,
        },
      ],
    };

    if (chartInstanceRef.current) {
        chartInstanceRef.current.data = chartData;
        chartInstanceRef.current.update();
    } else {
        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    font: {
                        size: 14,
                    },
                    color: '#475569' // slate-600
                  }
                },
                title: {
                  display: true,
                  text: 'Distribusi Status Dokumen',
                  font: {
                    size: 18,
                    weight: '600',
                  },
                  color: '#334155', // slate-700
                  padding: {
                    bottom: 20,
                  },
                },
              },
              cutout: '60%',
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

export default StatusChart;
