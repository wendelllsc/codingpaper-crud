import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Button, Form, Modal} from 'react-bootstrap'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import CodingPaperService from "../services/CodingPaperService";


const ModalAddGuideline = () => {
    const initialGuidelineState = {
        title: "",
        author: "",
    };

    const [show, setShow] = useState(false);
    const [guideline,setGuideline] = useState(initialGuidelineState);

    const handleAddGuideline = event => {
        const { value, id } = event.target;
        setGuideline({ ...guideline, [id]: value });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addGuideline = () => {
        var data = {
        title : guideline.title,
        author : guideline.author
        };
        if(data.title != "" && data.author != ""){
            CodingPaperService.createGuideline(data)
                .then(response => {
                console.log(response)
                })
                .catch(e => {
                console.log(e);
                });
        }else{
            console.log("campo em branco")
        };
        handleClose();
    }
       

  return (
    <div>
        
      <FontAwesomeIcon onClick={handleShow} icon={faCirclePlus} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Guideline</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="title" name="title" required={true} onChange={handleAddGuideline}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="author" name="author" onChange={handleAddGuideline}>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="author"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={addGuideline}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalAddGuideline;