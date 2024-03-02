



function VcApi(cb, loc) {   
    if(loc === undefined){
        loc = '90027';
    }

    // might need something for an undefined location (blank box)

    const f_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=us&key=ECSKR3TVKSR4SNP8XWTA332LV&contentType=json`

    /*
    return fetch(`${f_URL}`)
        .then((response) => response.json())
        //.then((response) => validDataCheck(response))
        //.then((response) => setCurLocData(response))        
        .then((response) => { cb(response) })        
        //.then((ret) => {return ret})
        .catch((err) => console.error(err));*/


        async function fetchData() {
            try {
                const response = await fetch(f_URL);
                /* thanks Robert! */
                if (!response.ok) {
                    console.error('Network resonse was not ok')
                    cb("not found");
                    //throw new Error('Network resonse was not ok'); 
                }
                /* thanks Robert! */
                const data = await response.json();
                cb(data);
            } catch (error) {
                console.error('Error fetching data:', error.message)
                //throw error;
            }
        }    
        fetchData();


}

export default VcApi;