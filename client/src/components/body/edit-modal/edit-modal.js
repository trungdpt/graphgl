import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col } from 'react-bootstrap';

export const EditModal = ({ show, handleClose, selectedPerson }) => {
    const [editPerson, setEditPerson] = useState();

    const handleFormChange = (e) => {
        editPerson[e.target.id] = e.target.value;
        setEditPerson({...editPerson});
    }

    useEffect(() => {
        if(show) {
            setEditPerson({...selectedPerson});
        } else {
            setEditPerson(null);
        }
    }, [show])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Edit Person Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="name" className="my-3">
                    <Form.Label column sm="3">
                        Name
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Name"
                            value={(editPerson && editPerson.name) || ''}
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="age" className="my-3">
                    <Form.Label column sm="3">
                        Age
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Age"
                            value={(editPerson && editPerson.age) || ''}
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="skill" className="my-3">
                    <Form.Label column sm="3">
                        Skill
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Skill"
                            value={(editPerson && editPerson.skill) || ''}
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="department" className="my-3">
                    <Form.Label column sm="3">
                        Department
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Department"
                            value={(editPerson && editPerson.department) || ''}
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                     </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}