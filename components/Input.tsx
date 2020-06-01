import React, { FunctionComponent, useState, useEffect } from "react";

export interface Props {
  label: string,
  value: string,
  onChange(value),
}

const Input: FunctionComponent<Props> = (props: Props) => {
  const {label, value, onChange} = props;
	const [fieldActive, setFieldActive] = useState(false);

	const activateField = () => {
		if(!value || value==='')
			setFieldActive(false);
		else
			setFieldActive(true);
	}
	
	const disableFocus = () => {
		if(!value || value==='')
			setFieldActive(false);
	}

	const updateInputValue = (val :string) => {
    onChange(val);
		if(!val || val==='')
			setFieldActive(false);
		else
			setFieldActive(true);
	}

  useEffect(() => {
    if(value && value!='') activateField();
  }, [value])

	return (
		<div className="field-group">
	    <label
	    // check state the input, whether it is active then apply the class for floating label
	    className={`field-label ${fieldActive?'field-active':''}`}
	    >
	      {label}
	    </label>
	    <input
	      className={`field-input ${fieldActive?'field-input-active':'field-input-inactive'}`}
	      type="text"
	      value={value}
	      placeholder={label}
	      onFocus={()=>activateField()}
	      onBlur={()=>disableFocus()}
	      onChange={e=>updateInputValue(e.target.value)}
	    />
    </div>
	)
}

export default Input