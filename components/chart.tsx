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
    labels: ['엄밀함', '의사 소통', '건설적인 제안', '정보 공유', '질문 퀄리티'],

    datasets: [
      {
        label: 'stats',
        // data: [stats[0], stats[1], stats[2], stats[3], stats[4]],
        data: [10, 9, 8, 9, 2],
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
        suggestedMax: 20,
      }
    }
  };
  return (
      <div className="profile" id="profile_rank">
        <Radar data={data} options={options}/>
        <div id="profile_rank_text">
          Rank #{current_rank}
        </div>
      </div>
    )
}

export interface Coordinate {
  x : number;
  y : number;
}

export interface XLabels {
  [key: string]: string;
}

type LineChartProps = {
  yData: Coordinate[],
  xLabels: string[][],
};

export function LineChart({ yData, xLabels }: LineChartProps) {
  const yData1= [
    {
      x: 0,
      y: 0,
      date: "2013. 3. 26."
    },
    {
      x: 1.6666666666666667,
      y: 3,
      date: "2013. 8. 26."
    },
    {
      x: 3.3333333333333335,
      y: 7,
      date: "2013. 10. 26."
    },
    {
      x: 5,
      y: 10,
      date: "2023. 1. 13."
    },
    {
      x: 6.666666666666667,
      y: 13,
      date: "2023. 3. 13."
    },
    {
      x: 8.333333333333334,
      y: 15,
      date: "2023. 6. 13."
    },
    {
      x: 10,
      y: 16,
      date: "2023. 8. 13."
    },
    {
      x: 10,
      y: 0,
      date: "2023. 8. 13."
    },
    {
      x: 12,
      y: 10,
      date: "2023. 8. 27."
    }
  ];

  const label_set = [["2013. 3. 26."], ["2023. 8. 13."], ["2023. 8. 27."]];
  const data : ChartData<"line"> = {
    labels: label_set,
    datasets: [
      {
        label: '시즌 별 누적 Stat 종합 점수',
        data: yData1,  //props에 따라 바꿀것
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
    parsing: {
      xAxisKey: 'x',
      yAxisKey: 'y',
      key: 'date',
    },
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
      // tooltip: {
      //   callbacks: {
      //     label: function(context) {
      //       var label = context.dataset.label || '';
      //       if (label) {
      //         label += ': ';
      //       }
      //       if (context.parsed.y !== null) {
      //         label += context.parsed.y;
      //       }
      //       return label;
      //     },
      //     title: function(context) {
      //       var title = context[0].dataset.label || '';
      //       if (title) {
      //         title += ': ';
      //       }
      //       if (context[0].parsed.y !== null) {
      //         title += context[0].
      //       }
      //       return title;
      //     }
      //   }
      // },
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
    <div className="profile_line_chart">
      <Line data={data} options={options} />
    </div>
  );
}