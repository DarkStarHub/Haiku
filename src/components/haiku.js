import { useEffect, useState } from 'react';
import styles from'./Haiku.module.css'



/* this is the display.. probably needs to be altered*/
function Haiku(props){
    
        
   const [curHaiku,setCurHaiku] = useState();    
    
    
    //set up Gemini API
    const { GoogleGenerativeAI } = require("@google/generative-ai");    
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_YOUR_API_KEY);
    
    function createWeatherPrompt(inc) {        
        const loc = inc.resolvedAddress;
        const curCond = inc.currentConditions;

        //let promptString = "write an emotional haiku to describe" + JSON.stringify(curCond) + "and slighty informed by" + JSON.stringify(loc) + "without directly mentioning any of the data, with each line enclosed in parenthesis";
        let promptString = "write an emotional haiku to describe the mood of this weather data" + JSON.stringify(curCond) + "and slighty informed by" + JSON.stringify(loc) + "without directly mentioning any of the data";
        return promptString;
    }

    
    
    function getHaiku()
    {
        if (!props.incdata) return;                  
        

        // create the prompt based on data here
        const prompt = createWeatherPrompt(props.incdata);
       

        async function run() {
            try{
                // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            //console.log(text);
            props.cb('3');
            setCurHaiku(text);
            return text;
            }catch(error){
                // need to handle this error for the user to see
                console.error('Error fetching data:', error.message)
            }            
        }
        run();  
         
    }

    function capitalizeFirstLetter(str) {
        return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    function lowercaseFirstLetter(str) {
        return str.split(" ").map(word => word.charAt(0).toLowerCase() + word.slice(1)).join(" ");
    }


    
    // check to make sure temp data is there.. and capitalize the city
    function separateLines(){
        if(!curHaiku)
        {
            return;
        }        
        const arrayOfLines = curHaiku.split('\n');        
        return(
            <div className={styles.card__lines}>
                <div>{arrayOfLines[0]}</div>
                <div>{arrayOfLines[1]}</div>
                <div>{arrayOfLines[2]}</div>
                
                <div className={styles.caption}>
                    
                    -{capitalizeFirstLetter(props.incdata.address)+","} {props.incdata.currentConditions.temp? props.incdata.currentConditions.temp+"f" :''}
                    </div>
            </div>            
        )
    }
    
      

    useEffect(()=>{        
        setCurHaiku(getHaiku());
    },[props.incdata])
  
   
       



    return(
        <div className={props.dstate ==='3'? `${styles.card } ${styles.fadein}` : `${styles.card} ${styles.fadeout}`}>
            {separateLines()}
        </div>
    )
}

export default Haiku

/*-{capitalizeFirstLetter(props.incdata.address)+","} {props.incdata.currentConditions.temp? props.incdata.currentConditions.temp+"f"+", "+lowercaseFirstLetter(props.incdata.currentConditions.conditions) :''}*/