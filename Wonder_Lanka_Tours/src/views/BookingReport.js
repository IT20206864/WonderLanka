import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Row, Col, Card } from "reactstrap";
import { jsPDF } from "jspdf";
import { ReactSession } from "react-client-session";

function BookingReport() {
  const location = useLocation();
  const history = useHistory();
  const [date, setdate] = useState();
  let doc;

  const downloadPDF = () => {
    doc = new jsPDF("p", "pt", [1000, 600]);
    doc.html(document.getElementById("report-cont"), {
      callback: function (pdf) {
        pdf.save("report.pdf");
      },
    });
  };

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    ReactSession.setStoreType("localStorage");
    if (ReactSession.get("user") != null) {
      document.body.classList.add("index");
      document.getElementById("report").classList.remove("card");
      let today = new Date().toISOString().slice(0, 10);
      setdate(today);
      return function cleanup() {
        document.body.classList.remove("index");
      };
     }
  }, []);
  if (!location.state) {
    history.push({
      pathname: "/my-tours",
    });
    return null;
  } else {
    return (
      <>
        <ProfilePageHeader></ProfilePageHeader>
        <IndexNavbar></IndexNavbar>
        <div className="main">
          <div className="my-tour-content">
            <h2 align="center">Report</h2>
            <hr></hr>
            <br></br>
            <Row>
              <Col>
                <Card className="report-card" id="report">
                  <div id="report-cont">
                    <Row>
                      <Col>
                        {" "}
                        <img
                          src={
                            require("assets/img/wonder-lanka-logo.png").default
                          }
                          className="report-logo"
                        /><br/>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <br></br>
                        <p className="report-contact">
                          100/77 City Gate, Temple Junction, Katana North,{" "}
                          <br></br>Katana, Negombo 11500<br></br>
                          Tel No. : +94 77 614 0895
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label style={{ float: "right", fontSize: "x-small" }}>
                          <i>Date : {date}</i>
                        </label>

                        <hr></hr>
                      </Col>
                    </Row>

                    <br></br>
                    <Row>
                      <Col>Tour Id : {location.state.tourId}</Col>
                      <Col>Booking Date : {location.state.bookingDate}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Full Name : {location.state.fullName}</Col>
                      <Col>Country :{location.state.country}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Email : {location.state.email}</Col>
                      <Col>Mobile No. : {location.state.mobileNo}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Arrival Date :{location.state.arrivalDate}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Tour Itinerary : {location.state.itinerary}</Col>
                      <Col>Insurance Plan : {location.state.insurance}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Class : {location.state.iclass}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>No. of Adults : {location.state.noOfAdults}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>
                        No. of Kids (Under Age 18) : {location.state.noOfKids18}
                      </Col>
                      <Col>
                        No. of Kids (Under Age 8) : {location.state.noOfKids8}
                      </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Tour Guide : {location.state.assignedGuide}</Col>
                      <Col>Driver : {location.state.assignedDriver}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Vehicle : {location.state.assignedVehicle}</Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                      <Col>Payment : LKR &nbsp;{location.state.payment}</Col>
                    </Row>
                    <br></br>
                  </div>
                </Card>
              </Col>
            </Row>
            <br></br>
            <div className="report-download">
              <Row>
                <Col>
                  <button
                    className="btn btn-info btn-edit-booking"
                    onClick={downloadPDF}
                  >
                    Download PDF
                  </button>
                </Col>
              </Row>
            </div>
          </div>

          <DemoFooter />
        </div>
      </>
    );
  }
}

export default BookingReport;
