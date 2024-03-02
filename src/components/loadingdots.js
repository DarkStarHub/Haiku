import styles from './Loadingdots.module.css'

function Loadingdots(props){
    return (
        <div className={props.dstate === "2"? `${styles.dots} ${styles.fadein}` : `${styles.dots} ${styles.fadeout}`}>
            <div className= {`${styles.dot} ${styles.dot1}`}></div>
            <div className={`${styles.dot} ${styles.dot2}`}></div>
            <div className={`${styles.dot} ${styles.dot3}`}></div>
            <div className={`${styles.dot} ${styles.dot4}`}></div>
            <div className={`${styles.dot} ${styles.dot5}`}></div>
        </div>
    )
}

export default Loadingdots;