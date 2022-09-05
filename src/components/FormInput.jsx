import { useState } from 'react';

function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, onChange, id, hint, inputCss, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className='flex flex-col mt-[20px]'>
      <label className='text-lg font-bold'>{label}</label>
      <input
        className={` ${inputCss}  text-[#666666] p-[15px] mt-[10px] mb-[10px]  border-2 border-solid border-[#8ac0e2] focus:outline-none focus:bg-[#f3f4ff] caret-[#6499ff] rounded-md`}
        //placeholder={props.placeholder}
        //  onChange={(e) => props.setMail(e.target.value)}
        // ref={props.refer}
        //name={props.name}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        required
      />
      <span className='text-sm font-light text-[#666666]'>{hint}</span>
    </div>
  );
}

export default FormInput;
