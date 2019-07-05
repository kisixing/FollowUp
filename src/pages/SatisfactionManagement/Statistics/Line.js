import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

class Basic extends React.PureComponent {
  render() {
    const data = [
      {
        value: 3,
      },
      {
        value: 4,
      },
      {
        value: 3.5,
      },
      {
        value: 5,
      },
      {
        value: 4.9,
      },
      {
        value: 6,
      },
      {
        value: 7,
      },
      {
        value: 9,
      },
      {
        value: 13,
      },
    ].map((_, index) => ({ ..._, year: `${index + 1}月` }));
    const cols = {
      value: {
        min: 0,
      },
      year: {
        range: [0, 1],
      },
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="value" />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom type="line" position="year*value" size={2} />
          <Geom
            type="point"
            position="year*value"
            size={4}
            shape="circle"
            style={{
              stroke: '#fff',
              //   lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Basic;
