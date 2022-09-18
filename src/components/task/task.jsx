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
    let hours = Math.floor(sec / (60 * 60));

    let divisor_for_minutes = sec % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    
    return <span>{hours}:{minutes}:{seconds}</span>;
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



