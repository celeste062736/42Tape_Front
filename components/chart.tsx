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
  current_rank: number;
};

export function RadarChart({stats, current_rank} : RadarChartProps) {
  const data = {
    labels: ['Rigorous', 'Communication', 'Constructive Suggestions', 'Informative', 'Sharp Questions'],
    datasets: [
      {
        label: 'Evaluation stats',
        data: [stats[0], stats[1], stats[2], stats[3], stats[4]],
        fill: true,
        backgroundColor: 'rgba(228,234,240,0.5)',
        borderColor: 'rgba(40,181,225,1)',
        pointBackgroundColor: 'rgba(40,181,225,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
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
            size: 10,
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
    <div className="profile">
      <div id="profile_rank">
        Rank #{current_rank}
      </div>
      <Radar data={data} options={options}/>
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
  xLabels: XLabels
};

export function LineChart({ yData, xLabels }: LineChartProps) {
  const yData1= [
    {
      x: 0,
      y: 0
    },
    {
      x: 1.6666666666666667,
      y: 3
    },
    {
      x: 3.3333333333333335,
      y: 7
    },
    {
      x: 5,
      y: 10
    },
    {
      x: 6.666666666666667,
      y: 13
    },
    {
      x: 8.333333333333334,
      y: 15
    },
    {
      x: 10,
      y: 0
    },
    {
      x: 12,
      y: 10
    }
  ];

  const label_set = [["2013. 3. 26."], ["2023. 8. 13."], ["2023. 8. 27."]];
  const data : ChartData<"line"> = {
    labels: label_set,
    datasets: [
      {
        label: 'Cumulative Score',
        data: yData1,  //props에 따라 바꿀것
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
            size: 16,
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
    <div className="profile_line_chart">
      <Line data={data} options={options} />
    </div>
  );
}