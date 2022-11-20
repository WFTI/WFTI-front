import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import TextFieldCss from "../../css/TextField.module.css"
import BtnFieldCss from "../../css/Button.module.css"

import TextField from "../../components/TextField";
import Postcode from "../../components/Postcode";
import Modal from "react-modal";

function Signup() {
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const schema = yup.object().shape({
        userEmpNo: yup.string().length(8),
        userNm: yup.string().min(2).max(10),
        pw: yup.string().matches(passwordRegExp),
        checkPw: yup.string().oneOf([yup.ref("pw"), null]),
        age: yup.string().min(1).max(3),
        gender: yup.string().min(1),
        bname: yup.string().min(1)
    }).required();

    const [disabled, setDisabled] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bname, setBname] = useState('');
    const [gender, setGender] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema)
    });

    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    const closePostCode = (data) => {
        console.log(data)
        setBname(data!=undefined ? data.bname : '');    
        setIsPopupOpen(false)
    }

    const submitForm = (data) => {
        data.address = {bname}.bname;
        data.gender = gender;
        errors.gender=true;

        setDisabled(true);
        console.log("submit : " + JSON.stringify(data));

        // axios.post('/v1/createUser')
        //     .then(response => console.log(response.resCd))
        //     .catch(error => console.log(error))
        axios.get('v1/user/selectUsers')
            .then(response => {
                console.log(response)
                setDisabled(false);
            })
            .catch( error => {
                console.log(error) 
                setDisabled(false);
            })
    }

    const btnEvent = (e) => {
        console.log(e.target.value)
        setGender(e.target.value);
    }

    return ( 
        <>
            <form onSubmit={handleSubmit(submitForm)} className={TextFieldCss.formWrapperR}>
                <TextField
                    text={"사번"}
                    name={"userEmpNo"}
                    errorMsg={errors.userEmpNo && "사번 형식이 맞지 않습니다."}
                    register={register}
                />
                <TextField
                    text={"이름"}
                    name={"userNm"}
                    errorMsg={errors.userNm && "2글자 이상 입력해주세요."}
                    register={register}
                />
                <TextField
                    text={"비밀번호"}
                    name={"pw"}
                    inputType={"password"}
                    errorMsg={errors.pw && "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."}
                    register={register}
                />
                <TextField
                    text={"비밀번호 확인"}
                    name={"checkPw"}
                    inputType={"password"}
                    errorMsg={errors.checkPw && "비밀번호가 똑같지 않습니다."}
                    register={register}
                />
                <TextField
                    text={"나이"}
                    name={"age"}
                    errorMsg={errors.age && "나이를 입력하세요."}
                    register={register}
                />
                <div className={TextFieldCss.fieldWrapperC}>
                    <label htmlFor="gender">성별</label>
                    <div className={BtnFieldCss.fdr} onChange={btnEvent}>
                        <input className={TextFieldCss.radioBtn}type="radio" name="gender" value="M"/>남성
                        <input className={TextFieldCss.radioBtn}type="radio" name="gender" value="F"/>여성
                    </div>
                    {errors.gender && <span className={TextFieldCss.errorMsgStyle}>"성별을 선택해주세요."</span>}    
                </div>
                <div className={TextFieldCss.fieldWrapperC}>        
                    <div className={TextFieldCss.fieldWrapperR}>
                        <label htmlFor="address">주거지역</label>
                        <button className={BtnFieldCss.searchBtn} type="button" onClick={openPostCode}>주소찾기</button>
                    </div>
                    <input type="text" {...register("address")} className={TextFieldCss.inputStyle} value={bname ? bname : ''} readOnly/>
                    {errors.bname && <span className={TextFieldCss.errorMsgStyle}>"주소를 입력해주세요."</span>}
                </div>
                
                <button className={BtnFieldCss.submitBtn} type="submit" disabled={disabled} >회원가입</button>
            </form>

            <Modal isOpen={isPopupOpen}>
                <Postcode onClose={closePostCode} />
            </Modal>
        </>
    )
}

export default Signup;
