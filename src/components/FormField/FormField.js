import React, { useState } from 'react';
import './FormField.css';

const FormField = ({ field, onUpdate }) => {
  const [label, setLabel] = useState(field.label);
  const [options, setOptions] = useState(field.options || []);
  const [optionInput, setOptionInput] = useState('');

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
    onUpdate({ ...field, label: e.target.value });
  };

  const handleAddOption = () => {
    if (optionInput) {
      const newOptions = [...options, optionInput];
      setOptions(newOptions);
      setOptionInput('');
      onUpdate({ ...field, options: newOptions }); // Update field options
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    onUpdate({ ...field, options: newOptions }); // Update field options
  };

  return (
    <div className="form-field">
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        placeholder="Field Label"
      />
      {field.type === 'dropdown' && (
        <div>
          <input
            type="text"
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            placeholder="Add Option"
          />
          <button onClick={handleAddOption}>Add Option</button>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                {option} <button onClick={() => handleRemoveOption(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormField;
