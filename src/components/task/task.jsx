import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css'

export const Task = ({ description, isDone, createdDate, id, seconds, onToggleProperty, onDelete, onTick }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const play = () => {
    if (isDone || timer || seconds <= 0) {
      return;
    }
    setTimer(setInterval(onTick, 1000, id, timer));
  };

  const pause = () => {
    if (!timer) {
      return;
    }
    
    clearInterval(timer);
    setTimer(null);
  };

  const formatTime = (sec) => {
    return [Math.floor(sec / 60 / 60), Math.floor((sec / 60) % 60), Math.floor(sec % 60)]
      .join(':')
      .replace(/\b(\d)\b/g, '0$1');
  };

  const toggleDone = () => {
    onToggleProperty('isDone', id, 'toggle', !isDone);
    setTimeout(pause);
  };

  return (
    <div className="view">
      <input className="toggle" onChange={toggleDone} type="checkbox" checked={isDone} />
      <label>
        <span className="title">{description}</span>
        <span className="description">
          <button aria-label="play" onClick={() => play(id)} type="button" className="icon icon-play" />
          <button type="button" onClick={() => pause(id)} aria-label="pause" className="icon icon-pause" />
          <span className="timer">{formatTime(seconds)}</span>
        </span>
        <span className="description-second">{formatDistanceToNow(createdDate)}</span>
      </label>
      <button
        className="icon icon-edit"
        aria-label="edit"
        type="button"
        onClick={() => onToggleProperty('isEditing', id)}
      />
      <button className="icon icon-destroy" aria-label="destroy" type="button" onClick={() => onDelete(id)} />
    </div>
  );
};


Task.defaultProps = {
  description: "",
  isDone: false,
  createdDate: new Date(),
};

Task.propTypes = {
  description: PropTypes.string,
  isDone: PropTypes.bool,
  createdDate: PropTypes.instanceOf(Date),
  id: PropTypes.number.isRequired,
  onToggleProperty: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


// import React from "react";
// import PropTypes from "prop-types";
// import { formatDistanceToNow } from "date-fns";

// import './task.css'
// export class Task extends React.Component {
//    constructor(props) {
//     super(props);
//     this.state = { time: {} , isCounting: false , timer : 0 };
//     this.startTimer = this.startTimer.bind(this);
//     this.countDown = this.countDown.bind(this);
//   }

//   secondsToTime(secs) {
//     let hours = Math.floor(secs / (60 * 60));

//     let divisor_for_minutes = secs % (60 * 60);
//     let minutes = Math.floor(divisor_for_minutes / 60);

//     let divisor_for_seconds = divisor_for_minutes % 60;
//     let seconds = Math.ceil(divisor_for_seconds);

//     let obj = {
//       h: hours,
//       m: minutes,
//       s: seconds,
//     };
//     return obj;
//   }

//   componentDidMount() {
//     let { time } = this.props;
//     let timeLeftVar = this.secondsToTime(time);
//     this.setState({ time: timeLeftVar, NewTime: time });
//   }

//   startTimer() {
//     if ((this.state.timer === 0 || this.state.timer !== 0) && this.state.isCounting === false) {
//       this.setState({ isCounting: true, timer : setInterval(this.countDown, 1000)});
//     }
//     else if (this.state.timer !== 0 && this.state.isCounting === false) {
//       this.setState({ isCounting: false , timer: setInterval(this.countDown, 1000)});
//     }
//   }

//   countDown() {
//     let NewTime = this.state.NewTime - 1;
//     if (NewTime < 0) {
//       return null
//     } 
//     this.setState({
//       time: this.secondsToTime(NewTime),
//       NewTime: NewTime,
//     });

//     if (NewTime === 0) {
//       clearInterval(this.state.timer);
//     }
//   }

//   timerStop () {
//     clearInterval(this.state.timer);
//     this.setState({ isCounting: false });
//   };

  
//   render() {
//     const {id, isDone, description, createdDate, onToggleProperty, onDelete} = this.props;

//     return (
//       <div className="view">
//        <input
//           className="toggle"
//           onChange={() => onToggleProperty("isDone", id)}
//           type="checkbox"
//           checked={isDone}
//           onClick={() => (isDone) ? this.startTimer() : this.timerStop()}
//         />
//         <label>
//           <span className="description">{description}</span>
//           <span className="description-second">
//             <button className="icon icon-play" onClick={() => isDone ? null : this.startTimer()}></button>
//             <button className="icon icon-pause"onClick={()=> this.timerStop()}></button>
//             <span className="time">{this.state.time.h}:{this.state.time.m}:{this.state.time.s}</span>
//           </span>
          
//           <span className="created">{formatDistanceToNow(createdDate)}</span>
//         </label>
//         <button
//           className="icon icon-edit"
//           aria-label="edit"
//           type="button"
//           onClick={() => onToggleProperty("isEditing", id)}
//         />
//         <button
//           className="icon icon-destroy"
//           aria-label="destroy"
//           type="button"
//           onClick={() => onDelete(id)}
//         />
//       </div>
//     );
//   }
// }


// Task.defaultProps = {
//   description: "",
//   isDone: false,
//   createdDate: new Date(),
// };

// Task.propTypes = {
//   description: PropTypes.string,
//   isDone: PropTypes.bool,
//   createdDate: PropTypes.instanceOf(Date),
//   id: PropTypes.number.isRequired,
//   onToggleProperty: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };


