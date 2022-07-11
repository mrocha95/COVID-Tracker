import React from 'react'

function Dropdown(props) {

  return (
    <div className="Dropdown">
     <label>
        {props.label}
        <select value={props.value} onChange={props.onChange}>
            {props.arr.map(function(el) {
                return (<option value={el}>{el}</option>)
            })}
        </select>
    </label>
    </div>
  );
}

export default Dropdown;
