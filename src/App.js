import styles from './App.module.css';

import Search from './components/search'
import { useEffect, useState } from 'react';
import VcApi from './vcApi';
import Haiku from './components/haiku';
import Resetbutton from './components/resetbutton';
import Loadingdots from './components/loadingdots';
import Loadscreen from './components/loadscreen';




function App() {

  const [curWeatherLoc, setCurWeatherLoc] = useState();
  const [dupe,setDupe] = useState(0);
  const [curLocData, setCurLocData] = useState(null);
  const [curLoc,setCurLoc] = useState('');
  // 0: first load,1:searchbox,2:dots,3:haiku display,4:first searchbox
  const [displayState,setDisplayState] = useState("0");
  const [searchPlaceholder,setSearchPlaceholder] = useState("enter a location for a verse...")

  /*
  function getLocationName() {
    return curLocData ? curLocData.resolvedAddress : '';
  } */

  async function dataPrep(inc) {
    if(inc === "not found"){
      locNotFound();
      setDisplayState('1');
      return;
    }
    try {
      if (inc instanceof Promise) {
        inc = await inc; // Resolve the promise if it's one
      }

      if (inc) {        
        setCurLocData(inc);        
        setDisplayState('2');
        // addPrevSearch(inc.address); // Add functionality if needed
        // setBackground(inc.currentConditions.datetime, inc.currentConditions.sunset, inc.currentConditions.sunrise); // Add functionality if needed
      }
    } catch (error) {
      console.error("Error fetching data:", error);     
    }
  }

  function locCheck(inc) {   
    if (curWeatherLoc === inc) {
      setDupe(dupe+1);
      return;
    }
    setCurWeatherLoc(inc);
  }  

  function locNotFound() {
    setSearchPlaceholder("location not found...");
    const timerId = setTimeout(() => {
      setSearchPlaceholder("enter a location for a verse...");
    }, 1600);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timerId);
  }

  function searching(){
    setSearchPlaceholder("searching...")
    setCurLoc("");

    const timerId = setTimeout(() => {
      setSearchPlaceholder("enter a location for a verse...");
          }, 1600);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timerId);
  }

 

  useEffect(() => {  
    if(!curWeatherLoc) {
      return;
    }
    VcApi(dataPrep, curWeatherLoc);
  }, [curWeatherLoc,dupe]);



  return (
    <div className={styles.mainpage}>      
      <div className={styles.mainpage__content}>
        <Haiku incdata={curLocData}
          dstate={displayState}
          cb={setDisplayState}>            
        </Haiku>
        <Search
          //onSearchChange={setCurWeatherLoc}
          setsearching={searching} 
          setloc={setCurLoc}         
          loc={curLoc}
          placeholder={searchPlaceholder}
          onSearchChange={locCheck}     
          dstate={displayState}>
        </Search>
        <Resetbutton
          dstate={displayState}
          reset={setDisplayState}>
        </Resetbutton>
        <Loadingdots
          dstate={displayState}>
        </Loadingdots>
        {displayState==='0' && <Loadscreen
          changestate={setDisplayState}>
        </Loadscreen>}              
      </div>           
    </div>
  );
}

export default App;
