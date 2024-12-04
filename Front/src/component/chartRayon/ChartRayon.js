import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ChartRayon = () => {
  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const series = [
      {
        data: [120, 200, 150, 80, 70],
        type: 'bar',
        stack: 'a',
        barWidth: 35,
        itemStyle: {
          opacity: 1 // Default opacity for all bars
        },
        emphasis: {
          itemStyle: {
            opacity: 1 // Full opacity when hovered
          }
        }
      }
    ];

    const stackInfo = {};
    for (let i = 0; i < series[0].data.length; ++i) {
      for (let j = 0; j < series.length; ++j) {
        const stackName = series[j].stack;
        if (!stackName) {
          continue;
        }
        if (!stackInfo[stackName]) {
          stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
          };
        }
        const info = stackInfo[stackName];
        const data = series[j].data[i];
        if (data && data !== '-') {
          if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
          }
          info.stackEnd[i] = j;
        }
      }
    }

    for (let i = 0; i < series.length; ++i) {
      const data = series[i].data;
      const info = stackInfo[series[i].stack];
      for (let j = 0; j < series[i].data.length; ++j) {
        const isEnd = info.stackEnd[j] === i;
        const topBorder = isEnd ? 25 : 25; // Change to 0 for no top border radius
        const bottomBorder = 0; // Change to 25 for rounded bottom corners
        data[j] = {
          value: data[j],
          itemStyle: {
            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
            color: getGradientForBar(j) // Get gradient for each bar
          }
        };
      }
    }

    function getGradientForBar(index) {
      const gradients = [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(51, 51, 51, 1)' },
            { offset: 1, color: 'rgba(255, 255, 255, 1)' }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(158, 20, 33, 1)' },
            { offset: 1, color: 'rgba(255, 255, 255, 1)' }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(44, 160, 44, 1)' },
            { offset: 1, color: 'rgba(255, 255, 255, 1)' }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0, 67, 255, 1)' },
            { offset: 1, color: 'rgba(255, 255, 255, 1)' }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 107, 0, 1)' },
            { offset: 1, color: 'rgba(255, 255, 255, 1)' }
          ]
        }
      ];
      return gradients[index % gradients.length];
    }

    const option = {
      xAxis: {
        type: 'category',
        data: ['Rayon 1', 'Rayon 2', 'Rayon 3', 'Rayon 4', 'Rayon 5']
      },
      yAxis: {
        type: 'value'
      },
      series: series,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      }
    };

    myChart.setOption(option);

    // Update opacity on hover
    myChart.on('mouseover', (params) => {
      const index = params.dataIndex;
      myChart.setOption({
        series: [
          {
            itemStyle: {
              opacity: 0.5
            },
            emphasis: {
              itemStyle: {
                opacity: 1
              }
            }
          }
        ]
      });
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: index
      });
    });

    myChart.on('mouseout', () => {
      myChart.setOption({
        series: [
          {
            itemStyle: {
              opacity: 1
            }
          }
        ]
      });
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
    });

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div id="main" style={{ width: '99%', height: '300px', marginLeft: '14px', cursor: 'pointer' }}></div>
  );
};

export default ChartRayon;
