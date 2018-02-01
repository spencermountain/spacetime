import React from 'react';
import { scaleLinear } from 'd3-scale';

const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

class Year extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.width = props.width || 600;
    this.scale = scaleLinear().domain([0, 12]).range([0, this.width]);
  }
  // orange() {}
  render(w) {
    let q = this.width / 4;
    let month = this.width / 12;
    let s = this.props.s;
    let orange = months.map((m, i) => {
      let tmp = s.clone();
      tmp.month(m);
      let meta = tmp.timezone();
      if (meta.current.isDST) {
        return <rect key={i} x={month * i} y={18} width={month} height={2} fill={'orange'} opacity={0.8}/>;
      }
      return null
    });
    let now = s.progress().year;
    let nowX = now * this.width;
    return (
      <svg width={this.width + 25} height={50}>
        <rect x={0} y={20} width={this.width} height={2} fill={'silver'} opacity={0.8}/>
        {orange}
         <text x={0} y={35} fontSize={15} fill={'darkgrey'}>{'dec'}</text>;
         <text x={(q * 1) - 15} y={35} fontSize={15} fill={'darkgrey'}>{'april'}</text>;
         <text x={(q * 2) - 15} y={35} fontSize={15} fill={'darkgrey'}>{'july'}</text>;
         <text x={(q * 3) - 15} y={35} fontSize={15} fill={'darkgrey'}>{'oct'}</text>;
         <text x={this.width - 15} y={35} fontSize={15} fill={'darkgrey'}>{'jan'}</text>;
         <rect x={nowX} y={0} width={2} height={20} fill={'cadetblue'}/>
      </svg>
      );
  }
}
module.exports = Year;
