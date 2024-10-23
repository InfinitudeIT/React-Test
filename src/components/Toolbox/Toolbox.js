import React from 'react';
import './Toolbox.css';

const Toolbox = ({ onDragStart }) => {
  return (
    <div className="toolbox">
      <h4>Add Fields</h4>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'text')}
      >
        Single Line Text
      </div>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'email')}
      >
        Email
      </div>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'phone')}
      >
        Phone No.
      </div>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'dropdown')}
      >
        Dropdown
      </div>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'checkbox')}
      >
        Checkbox
      </div>
      <div
        className="toolbox-item"
        draggable
        onDragStart={(e) => onDragStart(e, 'submit')}
      >
        Submit
      </div>
    </div>
  );
};

export default Toolbox;
