import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { userContext } from "../../App";
import axios from "axios"
function Edit({id}) {
  const{token}=useContext(userContext)
  const[url , setUrl]=useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Videos
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Update Your Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Lecture</Form.Label>
              <Form.Control
                type="text"
                placeholder="url of the new lecture"
                autoFocus onChange={(e)=>{
                  setUrl(e.target.value)
                }}
              />
            </Form.Group>
          
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
          
onClick={()=>{
axios.put(`https://test-yr87.onrender.com/lecture/updateAdd/${id}`,{lecture:url},{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(result=>{
})
.catch(err=>{
  console.log(err);
})
handleClose()  
window.location.reload(false);   }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
