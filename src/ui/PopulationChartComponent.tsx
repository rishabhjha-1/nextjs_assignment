import React from 'react';
import ReactECharts from 'echarts-for-react';  // Import the ECharts component

// Define the type for each item in the `data` prop
type DataItem = {
  date: number | string;
  value: number;
};

// Define the props type
interface PopulationChartProps {
  data: DataItem[];
  isPopulationPage?:boolean
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data,isPopulationPage=false }) => {
  // Handle the case where data is missing or empty
  if (!data || data.length === 0) {
    return <div>No data available for chart</div>;
  }

  // Filter and map the data to ensure valid entries are used
  const chartData = data
    .filter(item => item && item.date !== undefined && item.value !== undefined)
    .map(item => ({
      year: typeof item.date === 'string' ? new Date(item.date).toDateString().slice(8, 15) : item.date,
      population: item.value,
    }))
    .sort((a, b) => new Date(a.year).getTime() - new Date(b.year).getTime());

  // Handle the case where valid chart data is not available
  if (chartData.length === 0) {
    return <div>No valid data available for chart</div>;
  }

  // Prepare the ECharts option to match the design from the screenshot
  const options = {
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.year), // X-axis data (dates)
      boundaryGap: false,  // Removes space before the first and after the last point
      axisLabel: {
        color: '#A0A0A0',  // Light grey label color to match the image
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#A0A0A0',  // Light grey label color to match the image
      },
    },
    series: [
      {
        data: chartData.map(item => item.population), // Y-axis data (population values)
        type: 'line',
        smooth: true, // Makes the line smooth
        lineStyle: {
          color: '#7D4EDA', // Line color to match the image (purple)
        },
        itemStyle: {
          color: '#7D4EDA', // Point color on hover to match the image (purple)
        },
        areaStyle: {
          color: 'rgba(125, 78, 218, 0.1)', // Shaded area under the line
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',  // Tooltip background color
      textStyle: {
        color: '#000',  // Tooltip text color
      },
      borderColor: '#ccc',  // Tooltip border color
      borderWidth: 1,
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,  // Ensures labels fit within the grid
    },
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ReactECharts option={options} style={isPopulationPage?{ height: '100%',padding:'0 170px' }:{ height: '100%' }}  />
    </div>
  );
};

export default PopulationChart;
