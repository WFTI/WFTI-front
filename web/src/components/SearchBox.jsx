import React, {useState, useEffect} from 'react'
import TextFieldCss from "../css/TextField.module.css"
import BtnFieldCss from "../css/Button.module.css"
import { BrowerView, MobieView } from 'react-device-detect'

function SearchBox(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(props)
        console.log(JSON.stringify(props))
    })
    return (
        <div className={TextFieldCss.fieldWrapperR} style = {{
            paddingTop: '5%',
            paddingLeft: '10%',
            paddingRight: '5%',
            alignitems: 'center',
            justifycontent: 'center',
            zIndex : '999'
        }}>
            <span>Hello world</span>
        
        </div>
    );
};

export default SearchBox;

