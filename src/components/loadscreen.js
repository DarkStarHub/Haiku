import styles from './Loadscreen.module.css';
import { useEffect} from 'react';

function Loadscreen(props){

    //set a timer to disable this
    function disableScreen(){
        props.changestate('4');
    }
    
  
    useEffect(() => {        
        const timerId = setTimeout(() => {
            disableScreen();
        }, 1000);

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timerId);
    }, []);


    return(
        <div className={styles.loadmain}>
            <div className={styles.loadmain__title}>
                HAIKU
            </div>            
        </div>
    )
}


export default Loadscreen;