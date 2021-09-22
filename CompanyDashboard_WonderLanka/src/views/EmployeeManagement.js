import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../assets/css/EmployeeHome.module.css";
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';

function EmployeeManagement() {
    let history=useHistory();
    function handleClick(){
        history.push("/Add-Employee")
    }
    function handleClick2(){
        history.push("/View-Employee")
    }
  return (
        <>
      <IndexHeader />
      <IndexNavbar />
      <div style = {{paddingTop : "50px"}} className = {styles.body}>
      
      
       
        <center><h1 className={styles.header}>Employee Management </h1></center>
       
        <div style = {{paddingTop : "50px"}} className = {styles.btn_group}>
                    <button
                    onClick={handleClick}
                    className={styles.btn_empmng}
                   
                    type="button"
                    >
                    Add Employee
                    </button>

                    <button
                    onClick={handleClick2}
                    className={styles.btn_empmng}
                  
                    type="button"
                    >
                View Employees
                    </button>

                  

                    <button
                                        
                    className={styles.btn_empmng}
                  
                    type="button"
                    >
                 Employees Report
                    </button>
                    </div>
                
     
      </div>
  </>
  );
}

export default EmployeeManagement;