import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      started: false,
      laps: []
    };
  }

  start = (e) => {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.setState(state => ({time: state.time + 10, started: true})), 10);
  }

  stop = (e) => {
    clearInterval(this.timer);
    this.setState({time: 0, started: false});
  }

  pause = (e) => {
    clearInterval(this.timer);
    this.setState({started: false});
  }

  restart = (e) => {
    this.setState({time: 0, laps: []});
    this.start();
  };

  lap = (formattedTime) => {
    if (this.state.started) {
      this.setState(state => ({laps: state.laps.concat([formattedTime])}));
      this.lapsContainer.scrollTop = this.lapsContainer.scrollHeight;
    }
  }

  render() {
    const {time, started, laps} = this.state;
    const ms = Math.floor((time % 1000) / 10);
    const s = (Math.floor(time / 1000)) % 60;
    const m = (Math.floor(time / 1000 / 60)) % 60;
    const formattedTime = `${m > 9 ? m : "0" + m}:${s > 9 ? s : "0" + s}:${ms >= 10 ? ms : "0" + ms}`;
    return (
      <div className="App">
        <div style={{border:"1px solid black",margin: 20,fontSize:36}}>
          {formattedTime}
        </div>
        <div>
          {
            started ? (
            <button onClick={this.restart}>Restart</button>
            ) : (
              <button onClick={this.start}>Start</button>
            )
          }
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.stop}>Stop</button>
          <br/>
          <button onClick={e => this.lap(formattedTime)} disabled={!started} >Lap</button>
          {
            laps.length > 0 ? (
              <>
              <br/>
              <button onClick={e => this.setState({laps: []})}>Clear Laps</button>
              </>
            ) : null
          }
        </div>
        <div>
        <br/>
          <div style={{borderBottom: "1px solid #bbb"}}>Laps</div>
          <ol style={{maxHeight:300,maxWidth:200, overflow: "auto",margin:"0 auto"}} ref={el => this.lapsContainer = el}>
            {
              laps.map((lap, i) => <li key={i}>{lap}</li>)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default App;