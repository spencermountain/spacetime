'use strict';
import React from 'react';
import Year from './year';
import styler from 'react-styling/flat';
import ReactDOM from 'react-dom';
import spacetime from '../../builds/spacetime';
import { scaleLinear } from 'd3-scale';
import Radium from 'radium';

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
const dates = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 37
];
const timezones = [
  'Canada/Pacific',
  'Canada/Eastern',
  'Etc/UCT',
  'Europe/Istanbul',
  'Australia/Brisbane',
  'Australia/Canberra',
];
const years = [
  1922,
  1969,
  2008,
  2015,
  2015,
  2017,
  2018,
  2019,
  2020,
  2065,
];
const timeArrs = [
  '6:00',
  '8:00am',
  '12:00pm',
  '12:01pm',
  '4:20pm',
  '17:00',
  '11:55pm',
];

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
  display:inline-block
format:
  color:cadetblue
  font-size:40
key:
  color:grey
  width:100
  display:inline-block
value:
  color:steelblue
  display:inline-block
  width:100
  text-align:left
  font-size:20
black:
  color:steelblue;
tr
  min-width:400px
  padding:20px 0px 60px 60px
  `;

class App extends React.Component {
  constructor() {
    super();
    this.css = style;
    this.width = 600;
    this.scale = scaleLinear().domain([0, 24]).range([0, this.width]);
    this.state = {
      s: spacetime(Date.now())
    };
    this.drawDay = this.drawDay.bind(this);
    this.controls = this.controls.bind(this);
    this.change = this.change.bind(this);
    this.startOf = this.startOf.bind(this);
    this.endOf = this.endOf.bind(this);
    this.showOff = this.showOff.bind(this);
    this.setEpoch = this.setEpoch.bind(this);
  }

  showOff() {
    let {state, css} = this;
    let s = state.s;
    const methods = [
      'timeOfDay',
      'dayName',
      'dayOfYear',
      'week',
      'quarter',
      'season',
      'leapYear',
    ];
    let arr = methods.map((str, i) => {
      return (
        <div key={i}>
          <span style={css.key}>{str + ': '}</span>
          <span style={css.value}>{'' + s[str]()}</span>
        </div>
        );
    });
    let obj = s.timezone();
    arr.push(
      <div key={'hemisphere'}>
          <span style={css.key}>{'hemisphere: '}</span>
          <span style={css.value}>{obj.hemisphere}</span>
        </div>
    );
    arr.push(
      <div key={'epoch'}>
      <span style={css.key}>{'epoch: '}</span>
      <span >{'' + s.epoch}</span>
      </div>
    );
    arr.push(
      <div key={'dst'}>
          <span style={css.key}>{'dst: '}</span>
          <span style={css.value}>{'' + obj.current.isDst}</span>
        </div>
    );
    arr.unshift(
      <div key={'timezone'}>
          <span style={css.key}>{'timezone: '}</span>
          <span style={css.value}>{'' + obj.name}</span>
        </div>
    );
    return arr;
  }
  drawDay(s, key) {
    let {scale, css} = this;
    let h = s.hour();
    let paths = times.map((a, i) => {
      let x = scale(a[0]);
      let width = scale(a[1] - a[0]);
      return (
        <g height={50} y={50} key={i}>
          <text x={x} y={50} fontSize={10} fill={a[2]}>{a[3]}</text>
          <rect x={x} y={25} width={width} height={8} fill={a[2]} />
        </g>
        );
    });
    let nowPlace = scale(h);
    let remainder = this.width - nowPlace;
    let bar = <rect x={nowPlace} y={25} width={remainder} height={8} fill={'white'} opacity={0.8}/>;
    let time = <text x={nowPlace - 15} y={15} fontSize={20} fill={'darkgrey'}>{s.format().time.h12}</text>;
    return (
      <div key={key}>
        <div style={{
        marginLeft: 500,
        marginTop: 80
      }}>
          <Year width={this.width / 3} s={s}/>
        </div>
        <span>{s.tz}</span>
        <div>{s.monthName() + ' ' + s.date()}</div>
        <svg style={css.day} width={this.width} height={25}>
          {paths}
          {bar}
          {time}
        </svg>
      </div>
      );
  }
  setEpoch(e) {
    let epoch = e.target.value;
    this.setState({
      s: spacetime(epoch)
    });
  }
  change(num, unit) {
    let s = this.state.s;
    s.add(num, unit);
    this.setState({
      s: s
    });
  }
  startOf(unit) {
    let s = this.state.s;
    s.startOf(unit);
    this.setState({
      s: s
    });
  }
  endOf(unit) {
    let s = this.state.s;
    s.endOf(unit);
    this.setState({
      s: s
    });
  }
  set(val, unit) {
    let s = this.state.s;
    s[unit](val);
    this.setState({
      s: s
    });
  }
  controls() {
    let {state, css} = this;
    let s = state.s;
    return (
      <div style={css.controls}>
        <b style={css.black}>set:</b>
        <span style={css.margin}>
          <select onChange={(e) => this.set(e.target.value, 'month')}>
            {months.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </span>
        <span style={css.margin}>
          <select onChange={(e) => this.set(e.target.value, 'date')}>
            {dates.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </span>
        <span style={css.margin}>
          <select onChange={(e) => this.set(e.target.value, 'year')}>
            {years.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </span>
        <span style={css.margin}>
          <select onChange={(e) => this.set(e.target.value, 'time')}>
            {timeArrs.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </span>
        <br/>

        <b style={css.black}>timezone:</b>
        <span style={css.margin}>
          <select onChange={(e) => this.set(e.target.value, 'goto')}>
            {timezones.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </span>
        <br/>
        <b style={css.black}>add/subtract:</b>
          <span style={css.margin}>
            <span style={css.margin}>
              {'hour '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'hour')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'hour')}/>
            </span>
            <span style={css.margin}>
              {'day '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'day')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'day')}/>
            </span>
            <span style={css.margin}>
              {'week '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'week')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'week')}/>
            </span>
            <span style={css.margin}>
              {'month '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'month')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'month')}/>
            </span>
            <span style={css.margin}>
              {'season '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'season')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'season')}/>
            </span>
            <span style={css.margin}>
              {'quarter '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'quarter')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'quarter')}/>
            </span>
            <span style={css.margin}>
              {'year '}
              <input type='button' value={'+1'} onClick={() => this.change(1, 'year')}/>
              <input type='button' value={'-1'} onClick={() => this.change(-1, 'year')}/>
            </span>

          </span>
        <br/>
        <b style={css.black}>startOf:</b>
          <span style={css.margin}>
            <input type='button' value={'hour'} onClick={() => this.startOf('hour')}/>
            <input type='button' value={'day'} onClick={() => this.startOf('day')}/>
            <input type='button' value={'week'} onClick={() => this.startOf('week')}/>
            <input type='button' value={'month'} onClick={() => this.startOf('month')}/>
            <input type='button' value={'season'} onClick={() => this.startOf('season')}/>
            <input type='button' value={'quarter'} onClick={() => this.startOf('quarter')}/>
            <input type='button' value={'year'} onClick={() => this.startOf('year')}/>
          </span>
        <br/>
        <b style={css.black}>endOf:</b>
          <span style={css.margin}>
            <input type='button' value={'hour'} onClick={() => this.endOf('hour')}/>
            <input type='button' value={'day'} onClick={() => this.endOf('day')}/>
            <input type='button' value={'week'} onClick={() => this.endOf('week')}/>
            <input type='button' value={'month'} onClick={() => this.endOf('month')}/>
            <input type='button' value={'season'} onClick={() => this.endOf('season')}/>
            <input type='button' value={'quarter'} onClick={() => this.endOf('quarter')}/>
            <input type='button' value={'year'} onClick={() => this.endOf('year')}/>
          </span>
        <br/>
      </div>
      );
  }

  render() {
    let {state, css} = this;
    let s = state.s;
    let places = timezones.map((tz, i) => {
      let d = s.clone();
      d.goto(tz);
      return this.drawDay(d, i);
    });
    return (
      <div>
        spacetime <b>{spacetime.version}</b>
        <table>
          <tbody>
            <tr>
              <td style={css.tr}>
                <b style={css.format}>{`${s.format().nice.short}`}</b>
                {this.showOff()}
                <p></p>
                <Year width={this.width / 2} s={s}/>
              </td>
              <td style={css.tr}>
                {this.controls()}
              </td>
            </tr>
          </tbody>
        </table>
        <hr/>
        {'elsewhere:'}
        <ul>
          {places}
        </ul>
      </div>
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
