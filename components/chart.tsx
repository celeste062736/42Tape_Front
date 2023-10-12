"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Radar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


type RadarChartProps = {
  stats: number[];
  current_rank: string;
};

export function RadarChart({stats, current_rank} : RadarChartProps) {
  const data = {
    labels: ['엄밀함', '건설적인 제안', '의사 소통', '질문 퀄리티', '정보 공유'],

    datasets: [
      {
        label: 'stats',
        data: [stats[0], stats[1], stats[2], stats[3], stats[4]],
        fill: true,
        backgroundColor: 'rgba(228,234,240,0.5)',
        borderColor: 'rgba(40,181,225,1)',
        pointBackgroundColor: 'rgba(40,181,225,1)',
        pointBorderColor: 'rgba(10,151,195,1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        pointRadius: 3
      },
    ]
  };
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    },
    scales: {
      r: {
        ticks: {
          stepSize: 5,
          display: true,
        },
        angleLines: {
          display: true
        },
        pointLabels: {
          font: {
            size: 13,
            weight: '700',
            family: 'Pretendard',
          },
          color: '#000',
        },
        suggestedMin: 0,
        suggestedMax: 10,
      }
    }
  };
  return (
      <div id="profile_radar">
        <Radar data={data} options={options}/>
        <div id="profile_radar_text">
          Rank #{current_rank}
        </div>
      </div>
    )
}

export interface Coordinate {
  x : number;
  y : number;
}

type LineChartProps = {
  yData: Coordinate[],
  xLabels: string[][],
};

export function LineChart({ yData, xLabels }: LineChartProps) {
  const label_set = xLabels
  const data : ChartData<"line"> = {
    labels: label_set,
    datasets: [
      {
        label: '시즌 별 누적 Stat 종합 점수',
        data: yData,  //props에 따라 바꿀것
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0, //0.1
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: 'rgb(45, 162, 162)',
        pointRadius: 3
      },
    ],
  };

  const options : ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 10,
        }
      },
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: function(label, index, ticks) {
            return label_set[index] || null;
          },
          stepSize: 10
        }
      },
    },
  };

  return (
    <div id="profile_line_chart">
      <Line data={data} options={options} />
    </div>
  );
}