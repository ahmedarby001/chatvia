import React from 'react';
import './style.scss';
import { CheckMark } from '../../assets/SVGIcons';


interface CheckBoxProps {
   label?: string;
   isChecked: boolean;
   setState: Function;
}

function CheckBox({ label, isChecked, setState }: CheckBoxProps) {
   return (
      <div className="check-box" onClick={ () => setState() }>
         <div className={`content ${ isChecked? 'checked': '' }`}>
            <CheckMark />
         </div>
         <label>{ label }</label>
      </div>
   )
}

export default CheckBox;
