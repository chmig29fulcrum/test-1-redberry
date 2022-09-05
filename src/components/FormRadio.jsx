import React from 'react';

function FormRadio(props) {
  const { changed, id, isSelected, label, value, labelCSS } = props;
  return (
    <div className='RadioButton'>
      <input
        id={id}
        onChange={changed}
        value={value}
        type='radio'
        checked={isSelected}
      />
      <label className='text-lg ' htmlFor={id}>
        &nbsp;&nbsp;{label}&nbsp;&nbsp;
      </label>
    </div>
  );
}

export default FormRadio;
