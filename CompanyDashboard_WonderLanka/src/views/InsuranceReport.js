import{Button} from 'reactstrap'
import{ useHistory } from "react-router-dom"
import { jsPDF } from "jspdf";
import { useEffect } from "react/cjs/react.development";
import { useState } from 'react';
import IndexHeader from 'components/Headers/IndexHeader';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import DemoFooter from 'components/Footers/DemoFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Card,
    Alert,
    Container,
  } from "reactstrap";

toast.configure();
function InsuranceReport(){
    
    let history = useHistory();
    let doc;

    const [planes , setinsurencePlans] = useState([]);
    const [searchVal , setSearchVal] = useState("");



    useEffect(() => {
        axios.get('http://localhost:8070/insurences/report').then((res) =>{
          setinsurencePlans(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    
      }, []);
 

    var number = 1;

    const downloadPDF = () => {
 
      doc = new jsPDF({
        orientation : "landscape",
        unit :"pt",
        format : [1700,1000]
      })
      doc.html(document.getElementById("report-cont"), {
        callback: function (pdf) {
          pdf.save("InsuranceReport.pdf");
        },
      });
    };
    
    return(
        
        <div>
            <IndexNavbar />
            <IndexHeader />
            <h3 style ={{marginLeft:"40px"}}>Insurance Plan Report</h3>
            <h5 style ={{marginLeft:"40px"}}>Search by the Customer or Insurance Packages</h5><br/><br/>

            <Container>
      <br/><br/>
      <div style = {{marginLeft : "40px" , marginRight : "40px" }}>
      <div style = {{display : "flex" , flexDirection : "row" }}>
      <div style = {{width : "30%" }}>
      
                </div>

      </div>
      <Col>
            <FormGroup>
              <InputGroup style = {{marginLeft : "70px"}} className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search " type="text" 
                    onChange = {(e) =>{
                                setSearchVal(e.target.value);
                    }}/>
              </InputGroup>
            </FormGroup>
          </Col>
      <hr></hr>

      <div id ="report-cont" >
                <Card className="" id="report" style = {{padding : "20px"}}>
                    <Row>
                      <Col>
                        {" "}
                        <img
                          style = {{width : "30%" , marginLeft : "35%" }}
                          src={
                            require("assets/img/wonder-lanka-logo.png").default
                          }
                          className="report-logo"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <br></br>
                        <p className="report-contact"><h6>
                          100/77 City Gate, Temple Junction, Katana North,{" "}
                          <br></br>Katana, Negombo 11500<br></br>
                          Tel No. : +94 77 614 0895
                          </h6>
                        </p>
                      </Col>
                    </Row>
      
                   
                    <br/><br/>

                    <div style = {{marginLeft:"20px"}}  className = "tableContainer">
                <table className = "table">
                    <thead>
                    <th scope = "col">#</th>
                        <th scope = "col">Customer Name</th>
                        <th scope = "col">Insurance Plan Name</th>
                        <th scope = "col">No Of Adultes</th>
                        <th scope = "col">No of Kids(Under 18) </th>
                        <th scope = "col">No of Kids(Under 8)</th>
                    </thead>

                    <tbody>
                        
                        {planes.filter((val) =>{
                            if(searchVal === ''){
                              return val;
                            }
                            else if (val.fullName.toLowerCase().includes(searchVal.toLowerCase())){
                              return val;
                            }
                            else if (val.insurance.toLowerCase().includes(searchVal.toLowerCase())){
                              return val;
                            }
            

                        }).map((Booking)=>(
                                <tr>
                               <th scope = "row">{number++}</th>
                                <td>{Booking.fullName}</td>
                                <td>{Booking.insurance}</td>
                                <td>{Booking.noOfAdults}</td>
                                <td>{Booking.noOfKids18}</td>
                                <td>{Booking.noOfKids8}</td>
                                </tr>

                          ))}
                    </tbody>    


                </table>
            </div>  
          </Card> 
          </div>
          <div className="report-download">
              <Row>
                <Col>
                  <button
                    className="btn btn-info"
                    onClick={downloadPDF}
                  >
                    Download PDF
                  </button>
                </Col>
              </Row>
          </div>
      </div>

      </Container>


            
            <DemoFooter />
        </div>    
    );


}

export  default InsuranceReport;

