import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col } from 'react-bootstrap';

export const CreateModal = ({ show, handleClose }) => {
    const [createPerson, setCreatePerson] = useState(null);

    const handleFormChange = (e) => {
        createPerson[e.target.id] = e.target.value;
        setCreatePerson({...createPerson});
    }

    const submitForm = () => {
        console.log(createPerson);
    }

    useEffect(() => {
        if(show) {
            setCreatePerson({
                name: '',
                age: '',
                skill: '',
                department: ''
            });
        } else {
            setCreatePerson(null);
        }
    }, [show])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Create Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="name"
                                     className="my-3">
                    <Form.Label column sm="3">
                        Name
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Name"

                                      onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="age"
                                     className="my-3">
                    <Form.Label column sm="3">
                        Age
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Age"
                            
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="skill"
                                     className="my-3">
                    <Form.Label column sm="3">
                        Skill
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Skill"
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="department"
                                     className="my-3">
                    <Form.Label column sm="3">
                        Department
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Department"
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitForm}>
                    Create
                     </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}