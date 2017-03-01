import React from 'react';
import styler from 'react-styling/flat';
import ReactDOM from 'react-dom';
import spacetime from '../../builds/spacetime';
import { scaleLinear } from 'd3-scale';
import Radium from 'radium';

const times = [
  [0, 6, '#5C456A', ''], //early morning
  [6, 11, '#5C909A', '6am'], //morning
  [11, 17, '#4486DB', '11am'], //afternoon
  [17, 20, '#AA81C4', '5pm'], //dinner
  [20, 24, '#5C456A', '8pm'], //evening
];

const style = styler`
container
  position:relative
day:
  position:relative
  display:block
  height:100
  paddingLeft:150
controls:
  color:silver
  padding:20
  border:1px solid silver
margin:
  padding:20
  `;

const properTime = (h) => {
  let minute = (h % 1) + '';
  let hour = parseInt(h, 10);
  let ampm = 'am';
  if (hour >= 12) {
    ampm = 'pm';
    hour -= 12;
    if (hour == 0) {
      hour = 12;
    }
  }
  if (minute.length === 1) {
    minute = '0' + minute;
  }
  return `${hour}:${minute}${ampm}`;
};

class App extends React.Component {
  constructor() {
    super();
    this.width = 600;
    this.state = {
      s: spacetime(Date.now(), 'Canada/Eastern')
    };
    this.scale = scaleLinear().domain([0, 24]).range([0, this.width]);
    this.css = style;
    this.drawDay = this.drawDay.bind(this);
    this.controls = this.controls.bind(this);
    this.change = this.change.bind(this);
  }
  drawDay(h) {
    let {scale, css} = this;
    let paths = times.map((a) => {
      let x = scale(a[0]);
      let width = scale(a[1] - a[0]);
      return (
        <g height={50} y={50}>
          <text x={x} y={50} fontSize={10} fill={a[2]}>{a[3]}</text>
          <rect x={x} y={25} width={width} height={8} fill={a[2]} />
        </g>
        );
    });
    let nowPlace = scale(h);
    let remainder = this.width - nowPlace;
    let bar = <rect x={nowPlace} y={25} width={remainder} height={8} fill={'white'} opacity={0.8}/>;
    let time = <text x={nowPlace - 15} y={15} fontSize={20} fill={'darkgrey'}>{properTime(h)}</text>;
    return (
      <svg style={css.day} width={this.width} height={25}>
        {paths}
        {bar}
        {time}
      </svg>
      );
  }
  change(action) {
    let {state, css} = this;
    let s = state.s;
    const does = {
      upHour: () => {

      }
    };
  }
  controls() {
    let {state, css} = this;
    let s = state.s;
    return (
      <div style={css.controls}>
        <div>
          {'epoch: ' + s.epoch}
        </div>
        <span style={css.margin}>
          <input type='button' value={'+ hour'} onClick={this.change.bind('upHour')}/>
          <input type='button' value={'- hour'} onClick={this.change.bind('downHour')}/>
        </span>
        <span style={css.margin}>
          <input type='button' value={'+ day'} onClick={this.change.bind('upDay')}/>
          <input type='button' value={'- day'} onClick={this.change.bind('downDay')}/>
        </span>
        <span style={css.margin}>
          <input type='button' value={'+ month'} onClick={this.change.bind('upMonth')}/>
          <input type='button' value={'- month'} onClick={this.change.bind('downMonth')}/>
        </span>
      </div>
      );
  }
  render() {
    return (
      <div>
        spacetime demo
        {this.controls()}
        {this.drawDay(12)}
        {this.drawDay(18)}
      </div>
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
