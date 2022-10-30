import TextFieldCss from '../css/TextField.module.css'
import React from "react";
import { Path, UseFormRegister } from "react-hook-form";

function TextField ({ text, name, inputType = "text", register, errorMsg, readonly=false, value, ...others }) {
    return (
        <div className={TextFieldCss.fieldWrapperC}>
            <label htmlFor={name}>{text}</label>
            <input type={inputType} {...register(name)} className={TextFieldCss.inputStyle} defaultValue={value ? value : ''} readOnly={readonly} />
            {errorMsg && <span className={TextFieldCss.errorMsgStyle}>{errorMsg}</span>}
        </div>
    );
};

export default TextField;

