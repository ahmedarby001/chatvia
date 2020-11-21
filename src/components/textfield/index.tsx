import React from 'react';
import './style.scss';


interface TextFiledPropsType extends React.HTMLProps<HTMLInputElement> {
   Icon?: any;
   errorMsg?: string;
   margin?: string;
}


function TextField({ label, placeholder, errorMsg, margin, Icon, ...InputProps }: TextFiledPropsType) {
   return (
      <div className={`text-field-container ${errorMsg && 'has-err'}`}
          style={{ margin: margin }}
      >
         <label>{ label }</label>
         <div className="text-field">
            <div className="icon">
               { Icon && <Icon /> }
            </div>
            <input type="text" placeholder={ placeholder } { ...InputProps } />
         </div>
         { errorMsg && <div className="err-msg">{ errorMsg }</div> }
      </div>
   )
}

export default TextField;
