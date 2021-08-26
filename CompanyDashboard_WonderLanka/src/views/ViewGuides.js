import React from "react";
import styles from "../assets/css/AddItinerary.module.css";
import guideStyles from "../assets/css/ViewGuides.module.css";
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
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';



function ViewGuides() {
  const [guides, setguides] = useState([]);
  const [message , setMessage] = useState("");

  const deleteGuide = (guide) => {
    if (
      window.confirm(
        "Guide " + guide.guideID + " will be removed from the database"
      )
    ) {
      axios
        .delete(`http://localhost:8070/guides/delete/${guide.guideID}`)
        .then((res) => {
          console.log(res);
          window.location.reload();
          
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong :(");
        });
      let filteredGuides = guides.filter((gid) => gid !== guide);
      setguides(filteredGuides);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/guides")
      .then((res) => {
        setguides(res.data);
      })
      .catch((err) => {
        alert("Something went wrong :(");
        console.log(err);
      });

    return () => {
      // cleanup
    };
  }, []);

  let history = useHistory();

  //const handleEdit = (guide) =>{
   // history.push(`/edit-guide/${guide._id}`);
//  }

  return (
    <>
    <IndexHeader />
    <IndexNavbar />
    <div className={guideStyles.viewGuideDiv}>
    <h3>Tour Guide Details</h3><br/><br/>
      <Row>
        <Col>
          <FormGroup>
            <InputGroup className="form-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Search " type="text" />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col>
          <div>
            <Label check>
              <Input type="checkbox" />{" "}
              <label className={guideStyles.checkBoxLabel}>Full Name</label>
            </Label>

            <Label check>
              <Input type="checkbox" />{" "}
              <label className={guideStyles.checkBoxLabel}>License ID</label>
            </Label>

            <Label check>
              <Input type="checkbox" />{" "}
              <label className={guideStyles.checkBoxLabel}>Guide ID</label>
            </Label>
          </div>
        </Col>
        <Col></Col>
      </Row>
      <table width="100%" border="2px" className={guideStyles.tbldata}>
        <tr>
          <th className={guideStyles.tbldata}>Guide ID</th>
          <th className={guideStyles.tbldata}>First Name</th>
          <th className={guideStyles.tbldata}>Last Name</th>
          <th className={guideStyles.tbldata}>Tel No.</th>
          <th className={guideStyles.tbldata}>E-Mail</th>
          <th className={guideStyles.tbldata}>License ID</th>
          <th className={guideStyles.tbldata}>Foreign Languages</th>
          <th className={guideStyles.tbldata}>Actions</th>
        </tr>
        {guides.map((guide) => (
          
          <tr className={guideStyles.tbldata}>
            <td className={guideStyles.tbldata}>{guide.guideID}</td>
            <td className={guideStyles.tbldata}>{guide.fName}</td>
            <td className={guideStyles.tbldata}>{guide.lName}</td>
            <td className={guideStyles.tbldata}>{guide.telNo}</td>
            <td className={guideStyles.tbldata}>{guide.email}</td>
            <td className={guideStyles.tbldata}>{guide.licenseID}</td>
            <td className={guideStyles.tbldata}>{guide.foreignLang}</td>
            <td className={guideStyles.tbldata}>
              <button 
              className={guideStyles.btnEdit}
              onClick = {() =>{
           //     handleEdit(guide);
                   history.push(`/edit-guide/${guide._id}`);
              }}
              >Edit</button>

              <button
                className={guideStyles.btnDelete}
                onClick={() => {
                  deleteGuide(guide);
                  setMessage("Guide Deleted!");
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <span style = {{textAlign:"left" , color : "red"}}>{message}</span>
    </div>
    <DemoFooter />
    </>
  );
}

export default ViewGuides;

