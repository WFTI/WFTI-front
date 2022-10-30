import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import SearchBox from '../../components/SearchBox';
import ClubList from '../../components/ClubList';

import TextFieldCss from "../../css/TextField.module.css"
import BtnFieldCss from "../../css/Button.module.css"

// 더미데이터
import clubList from '../../dummy/clubList.json'
import clubRecommandList from '../../dummy/clubRecommandList.json'
import list from '../../dummy/searchList.json'

function SearchMain(){
    const [joinedClubList, setClubList] = useState([]);
    const [clubRecommand, setClubRecommand] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [search, setSearch] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    const fetchClubList = async() => {
        try{
            setClubList(clubList);
            setClubRecommand(clubRecommandList);
        } catch (error) {
            console.log("error");
        }
    }
    useEffect(() => {
        // api 콜해서 json 으로 받은 데이터를 useState로 집어 넣음
        fetchClubList();
    }, [])

    // 검색 누르면 검색창 밑으로 화면이 변하도록 한다.
    const onChangeSearch = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setSearch(e.target.value);
    }

    const onSearch = (e) => {
        e.preventDefault();
        console.log(e)
        setSearchVisible(true);
        if(searchList === null || search === '') {
            // 맨 처음에는 목록을 가져와서 저장만 하자.
            setSearchList(list.clubNmList);
        } else {
            const filterData = searchList.filter((data) => data.clubNm.includes(search))
            setSearchList(filterData)
        }
        setSearchVisible(false)
    }
    return (
        <>
            {/* 서치 박스 */}
            <form onSubmit={e => onSearch(e)}>
                <div className={TextFieldCss.fieldWrapperR} style = {{
                    paddingTop: '5%',
                    paddingLeft: '10%',
                    paddingRight: '5%',
                    alignitems: 'center',
                    justifycontent: 'center'
                }}>
                <input className={TextFieldCss.inputStyle} value={search} type="text" placeholder="검색" onChange={onChangeSearch}
                    style={{
                        width:'70%'
                    }}
                />
                <button className={BtnFieldCss.searchBtn} style={{ 
                    display:'flex',
                    padding: '5%',
                }} type="submit" >검색</button>
            
                </div>
            </form>
            {searchVisible ? <SearchBox props={searchList} /> :     
                <div id="clubList">
                    {/* 이런 활동은 어떠세요? */}
                    <ClubList props={ joinedClubList } message={"이런 활동은 어떠세요?"}/>
                    {/* 참여중인 활동 */}
                    <ClubList props={ clubRecommand } message={"참여중인 활동"}/>
                </div>
            }
        </>
    );
}

export default SearchMain;