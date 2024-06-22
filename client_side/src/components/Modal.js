import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import './Modal.css';

const CustomModal = ({ activeItem, toggle, onSave }) => {
  // Initialize state using the activeItem prop
  const [item, setItem] = useState(activeItem);

  // Update the state when activeItem prop changes
  useEffect(() => {
    setItem(activeItem);
  }, [activeItem]);

  // Handle changes to form inputs
  const handleChange = e => {
    const { name, type, value, checked } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>
          <FormGroup check>
      <Input
        type="checkbox"
        name="completed"
        checked={item.completed}
        onChange={handleChange}
        className="me-3 custom-height-input"
        id="completed"
      />
      <Label for="completed" className="custom-height-label">
        Completed
      </Label>
    </FormGroup>

          
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
