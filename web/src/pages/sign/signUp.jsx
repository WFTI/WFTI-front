import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import TextField from "../../components/TextField";
import Postcode from "../../components/Postcode";
import PopupDom from "../../components/PopupDom";

function Signup() {
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        nickName: yup.string().min(2).max(10).required(),
        pw: yup.string().matches(passwordRegExp).required(),
        checkPw: yup.string().oneOf([yup.ref("pw"), null]),
        birth: yup.string().required()
    }).required();

    const [disabled, setDisabled] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bname, setBname] = useState('');

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
        setBname(data.bname);    
        setIsPopupOpen(false)
    }

    const submitForm = (data) => {
        console.log("submit : " + JSON.stringify(data));
        // axios.post('/v1/createUser')
        //     .then(response => console.log(response.resCd))
        //     .catch(error => console.log(error))
        axios.get('v1/user/selectAll').then(response => console.log(response)).catch(error => console.log(error))
    }
    return ( 
        <form onSubmit={handleSubmit(submitForm)} css={[formWrapper]}>
            <TextField
                text={"이메일"}
                name={"email"}
                inputType={"email"}
                errorMsg={errors.email && "이메일 형식이 맞지 않습니다."}
                register={register}
            />
            <TextField
                text={"닉네임"}
                name={"nickName"}
                errorMsg={errors.name && "2글자 이상 입력해주세요."}
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
            <div>
                <TextField
                    text={"주거지역"}
                    name={"address"}
                    errorMsg={errors.address && "주소를 입력해주세요."}
                    register={register}
                    readonly={true}
                    value={bname}
                /> 
                <button type = 'button' onClick={openPostCode}>주소찾기</button>
                <div id = 'popupDom'>
                    {isPopupOpen && (
                        <PopupDom>
                            <Postcode onClose={closePostCode} />
                        </PopupDom>
                    )}
                </div>
            </div>
            
            <TextField
                text={"생년월일"}
                name={"birth"}
                inputType="date"
                errorMsg={errors.birth && "생년월일을 입력해주세요."}
                register={register}
            />
            <button type="submit" disabled={disabled} >회원가입</button>
        </form>
    )
}

export default Signup;

const formWrapper = css`
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 0 auto;
  padding: 50px;
`;
