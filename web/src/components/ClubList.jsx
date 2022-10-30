import React, { useState, useEffect} from 'react'
import ListCss from '../css/List.module.css'

function ClubList({props, message}) {
    const [clubInfo, setClubInfo] = useState([]);

    useEffect(() => {
        setClubInfo(props.clubList);
    })
    
    return (    
        <div>
            <h4>{message}</h4>
            <div className={ListCss.rowContainer}>
                { clubInfo && clubInfo.map(club => {
                   return( <div  className={ListCss.colContainer}>
                                <div key={club.clubSrno} className={ListCss.clubList} />
                                <span> {club.clubNm} </span>
                            </div> )
                    } )
                }
            </div>
        </div>
    );
};

export default ClubList;

