import React from 'react';
import { css } from "@emotion/react";
import DaumPostcode from "react-daum-postcode";
 
const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        
        props.onClose(data)
    }
 
    return(
        <>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button>
        </>
    )
}
 
export default PopupPostCode;

const postCodeStyle = css `
    background : rgba(0,0,0,0.25);
    position : fixed;
    left:0;
    top:0;
    height:100%;
    width:100%;
  `;