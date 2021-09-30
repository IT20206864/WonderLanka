import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import IndexHeader from "components/Headers/IndexHeader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import {
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Alert,
  Container,
} from "reactstrap";
import { useHistory } from "react-router";



function AssignVehicle(){



    const [bookings , setBookings] = useState([]);
    const [vehicle , setVehicle] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:8070/bookings/").then((res) =>{
            setBookings(res.data);
        })
    })
    let history = useHistory();
    var number = 1;

    function VehicleAssigned(vid){
        axios.get(`http://localhost:8070/assignedVehicle/get/${vid}`).then((res)=>{
          console.log(res.data.vehicleID);
          setVehicle(res.data.vehicleID);
          if (typeof vehicle == 'undefined'){
            return "Not Assigned";
          }
          
        }).catch((err)=>{
          console.log(err);
        })
        
        return vehicle;

        
    }
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            <h3 style ={{marginLeft:"40px"}}>Assigned Vehicles</h3><br/><br/>

            <Row>
          <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "40px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" 
/>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>
              <Label style = {{marginLeft : "40px"}} check>
                <Input type="checkbox"/>{" "} 
                <label style ={{marginRight : "40px"}}>Tour ID</label>
              </Label>
            </div>
          </Col>
          <Col></Col>
        </Row>

            <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table table-striped">
                    <thead>
                        <th scope = "col">#</th>
                        <th scope = "col">Tour ID</th>
                        <th scope = "col">Booking Date</th>
                        <th scope = "col">Arrival Date</th>
                        <th scope = "col">Country </th>
                        <th scope = "col">vehicle Assigned </th>
                        <th scope = "col">Operation</th>

                    </thead>

                    <tbody>
                        
                        {bookings.map((booking) =>(
                            
                            <tr>
                                <th scope = "row">{number++}</th>
                                <td>{booking.tourId}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.arrivalDate}</td>
                                <td>{booking.country}</td>
                                <td>{VehicleAssigned(booking.tourId)}</td>
                                <td><Button color="warning"  style = {{padding: "5px 5px 5px 5px" , width : "80px" , marginBottom : "8px"}}
                                onClick = {()=>{
                                    history.push(`/assign-vehicle/${booking.username}`);
                                }}
                                >Assign Vehicle</Button>
                               </td>
                            </tr>
    
                        ))}
                    </tbody>    


                </table>
            </div>   
            
            <DemoFooter />
        </div>    
    );

}

export default AssignVehicle;