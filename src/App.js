import DataGrid from 'react-data-grid';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryPolarAxis, VictoryTheme, VictoryPie, VictoryLine } from 'victory';
import { generateColumns, makeCountByFavColor } from './data-utils';
import './App.css';
import jsonData from './MOCK_DATA.json';

function App() {
  const response = JSON.parse(JSON.stringify(jsonData));
  const munged = makeCountByFavColor(response);
  const polarxy = [];
  const colorArr = [];
  // response.map(line => console.log(`|| line >`, line));

  function getxy() {
    for (let m of munged) {
      polarxy.push({ x: m.color, y: m.totalCount });
    }
    return polarxy;
    // munged.map(() => polarxy.push({ x: 'color', y: 'totalCount' }));
  }


  function getColors(){
    for (let m of munged) {
      colorArr.push({
        x: m.key + 1,
        y: m.totalCount,
        label: `${m.totalCount} ${m.color}`
      });
    }
    return colorArr;
  }

  const justColorArr = [];
  function justColors(){
    for (let m of munged) {
      justColorArr.push(m.color);
    }
    return justColorArr;
  }
  return (
    <>
      <DataGrid
        columns={generateColumns(response)}
        rows={response}
      />
      <VictoryChart domainPadding={40} >
        <VictoryLabel text='Total Favorite Number Count' x={225} y={50} textAnchor='middle' />
        <VictoryAxis
          style={{
            axis: { stroke: '#E0F2F1' },
            axisLabel: { fontSize: 8 },
            ticks: { stroke: '#ccc' },
            tickLabels: {
              fontSize: 12,
              angle: -90,
              fontWeight: 'bold',
              verticalAnchor: 'bottom',
              textAlign: 'right'
            },
            data: {
              fill: 'red',
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fill: 'red', fontSize: 6 } }}
        />
        <VictoryBar
          x='color'
          y='totalCount'
          data={makeCountByFavColor(response)}
        />
      </VictoryChart> 
          
      <VictoryChart polar
        theme={VictoryTheme.material}
      >
        {
          munged.map((munge, i) => {
            return (
              <VictoryPolarAxis dependentAxis
                key={i}
                label={munge.color}
                labelPlacement='perpendicular'
                axisValue={munge.color}
              />
            );
          })  
        }
        <VictoryBar
          style={{ data: { fill: 'tomato', width: 15 } }}
          data={getxy()}
        />
      </VictoryChart>

      <VictoryPie
        colorScale={justColors()}
        data={getColors()}
      />

      <VictoryChart>
        <VictoryAxis
          style={{
            axis: { stroke: '#E0F2F1' },
            axisLabel: { fontSize: 8 },
            ticks: { stroke: '#ccc' },
            tickLabels: {
              fontSize: 12,
              angle: -90,
              fontWeight: 'bold',
              verticalAnchor: 'bottom',
              textAlign: 'right'
            },
            data: {
              fill: 'red',
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fill: 'red', fontSize: 6 } }}
        />
        <VictoryLine
          interpolation='natural'
          data={getxy()}
        />
      </VictoryChart>

    </>);
}

export default App;
