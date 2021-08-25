import  { useHistory } from 'react-router-dom'
import styles from "../assets/css/ItineraryHome.module.css"

function ItineraryManagement(){

    let history = useHistory();
    
    function handleClickAdd(){
        history.push("/add-itinerary");
    }

    function handleClickView(){
        history.push("/view-itineraries");
    }

    return(
        <div style = {{paddingTop : "50px"}} className = {styles.body}>
            <h3 className = {styles.header}><center>Itinerary Management</center></h3><br/><br/>

            <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>

                <button className = {styles.btn_guidemng} onClick = {handleClickAdd}>Add Itinerary</button>
            
        
                <button className = {styles.btn_guidemng} onClick = {handleClickView}>View Tour Iteneraries</button>
             
    
                <button className = {styles.btn_guidemng}>Custom Itinerary Report</button>
        
            
                <button className = {styles.btn_guidemng}>Custom Itinerary Requests</button>
            
            </div>

            </div>

           
    );
}

export default ItineraryManagement;