import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function Add({id}) {
  const [show, setShow] = useState(false);
const [article, setArticle] = useState("")
const [url, setUrl] = useState("")
  const { token } = useContext(userContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={()=>{
        handleShow()
      }}>
        Add Lecture
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Enter Lecture Details</Modal.Title>
        </Modal.Header>
        <InputGroup>
          <InputGroup.Text>Article</InputGroup.Text>
          <Form.Control as="textarea" aria-label="With textarea" 
              autoFocus
              onChange={(e) => {
  setArticle(e.target.value)
              }}
          />
        </InputGroup>

        {/* <InputGroup className="mb-3">
          <Form.Control
            placeholder="Question"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            autoFocus
            onChange={(e) => {
setQuestion(e.target.value)
            }}
          />
          <InputGroup.Text id="basic-addon2">Question</InputGroup.Text>
        </InputGroup> */}

        <Form.Label htmlFor="basic-url">Your Lectures URLs</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            https://example.com
          </InputGroup.Text>
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            autoFocus
            onChange={(e) => {
setUrl(e.target.value)
            }}
          />
        </InputGroup>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              axios.post(`https://test-yr87.onrender.com/lecture/create/${id}`,{
                
                article:article,
              lecture:url,
            }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(result=>{
                handleClose()
              })
              .catch(err=>{
              })
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
