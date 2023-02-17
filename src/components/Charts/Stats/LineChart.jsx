import React from 'react'
import { Line } from 'react-chartjs-2';

const LineChart = ({ labels, Total,Title, labelTitle }) => {
  return (
    <div className='line-chart-stats'>
      <h4>{Title}</h4>
      <Line
        datasetIdKey='id'
        data={{
          labels: labels,
          datasets: [
            {
              id: 1,
              label: `${labelTitle}`,
              data: Total
            }
          ],
        }}
      /></div>
  )
}

export default LineChart

