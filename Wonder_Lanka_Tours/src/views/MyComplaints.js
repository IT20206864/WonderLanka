import React, { useState, useEffect } from "react";
import axios from "axios";
// reactstrap components

// core components
import {
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/ComplaintHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MyComplaints() {
  //let [complaint, setComplaint] = useState(0)
  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
    document.body.classList.add("index");
    
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  //adding state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [select, setSelect] = useState("");
  const [text, setText] = useState("");

  function sendData(e){
    e.preventDefault();
    alert("");

    const newComplaint = {
      name,
      email,
      contact,
      select,
      text
    }

    console.log(newComplaint);
    axios.post("http://", newComplaint).then(()=>{
      alert("Complaint Added")
      setName("");
      setEmail("");
      setContact("");
      setSelect("");
      setText("");

    }).catch((err)=>{
      alert(err)
    })

  }

  return (
    <>
      <h3>My Complaints</h3>
      <IndexNavbar />
      <IndexHeader />

      <div className="mainComlplaint">
      <form onSubmit={sendData}>

      <FormGroup>
        <Label for="Name">Name</Label>
        <Input type="name" name="name" id="idName" placeholder="A.D. Amarasekara" onChange={(e)=>{
          setName(e.target.value);
        }}/>
      </FormGroup>
      <FormGroup>
        <Label for="Email">Email address</Label>
        <Input type="email" name="email" id="idEmail" placeholder="name@gmail.com" onChange={(e)=>{
          setEmail(e.target.value);
        }}/>
      </FormGroup>
      <FormGroup>
        <Label for="contact">Contact No</Label>
        <Input type="contact" name="contact" id="idContact" placeholder="(+94) 555-555-555" onChange={(e)=>{
          setContact(e.target.value);
        }}/>
      </FormGroup>
      <FormGroup>
        <Label for="typeSelect">Type of complaint</Label>
        <Input type="select" name="select" id="typeSelect" onChange={(e)=>{
          setSelect(e.target.value);
        }}>
          <option>There's no free WI-FI in my room?</option>
          <option>here's no free Hot water in my room?</option>
          <option>The attitudes and behaviours of your staff are unacceptable</option>
          <option>I cancelled my hotel room booking just before i was supposed to check in. Why can't i get my money back?</option>
          <option>That's not what it says (or looks like) on your website.</option>
          <option>There's problem with the vehicle we hired.</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Any other custom complaint</Label>
        <Input type="textarea" name="text" id="idText" onChange={(e)=>{
          setText(e.target.value);
        }}/>
      </FormGroup>
      <Button color="primary" type="submit">
        Submit
      </Button>
      </form>
      </div>
    </>
  )
}

export default MyComplaints;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MyComplaintsTable () {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    function getComplaints() {
      axios.get("http://localhost:").then((res) => {
        console.log(res);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getComplaints();
  },[])

  return (
    <>
      <Title>Complaint History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tour ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Complaint</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.tid}>
              <TableCell>{row.tid}</TableCell>
              <TableCell>{row.cid}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.complaint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DemoFooter />
    </>
  )
}

export default MyComplaintsTable;