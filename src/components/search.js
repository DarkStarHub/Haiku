import React from 'react';
import { useState} from "react";
import styles from './Search.module.css'; 



function Search(props) {

    const [curLoc, setCurLoc] = useState('');    
    
    
        
    const handleInputChange = (newLoc) => {
        setCurLoc(newLoc);
    };

      
    

    const submitSearch = (event) => {            
        if(props.dstate !="1" && props.dstate !="4")
        {            
            return;
        }           
        if (event.key === "Enter" || event.type === "click") {           
            const searchValue = curLoc || '90027';            
            props.onSearchChange(searchValue); 
                        
            const timerId = setTimeout(() => {
                setCurLoc("");
            }, 1600);
    
            // Cleanup the timer when the component is unmounted
            return () => clearTimeout(timerId);     
        }
    };

    function searchIco(){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }} fill="#c2c2c2">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
        );
    }
    
       

    return (
        <div className={props.dstate === '4'? `${styles.searchbox} ${styles.enterfirst}`: props.dstate === "1"? `${styles.searchbox} ${styles.enter}` : `${styles.searchbox } ${styles.fadeout}`}>
            <input
                className={styles.searchbox__searchimp}
                type="text"
                placeholder="Where do you dream of..."
                value={curLoc}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={submitSearch} 
                spellCheck="false"/>
            <div className={styles.searchbox__searchbutton}>
                <div className={styles.searchbox__searchbutton__button}                               
                    onClick={submitSearch}>
                      {searchIco()}      
                </div>
            </div> 
        </div>
    );
}

 

export default Search;


/* */

 /*
    const searchBox = () =>{
        return (
            <input className="searchbox__searchimp" type="text" placeholder="enter city or zip"
                value={curLoc} onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={submitSearch} />
        )
    }*/

    /*
    function handleSearchButton(){
        if(curLoc === null)      
            {
                onSearchChange('New York');
                return
            }  
        onSearchChange(curLoc);             
    }*/

    
    /*
    const submitNewLoc = (event) => {        
        if (event.key === "Enter") {             
            if(curLoc === null)      
            {
                onSearchChange('New York');
                return
            }             
            onSearchChange(curLoc);
            //savePrevLoc(curLoc);
        }
    };*/