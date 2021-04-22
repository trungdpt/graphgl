import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Table, Container, Row, Button, Modal, Form, Col } from 'react-bootstrap';
import { MOCK_DATA } from '../../services/mock-data';
export const Body = () => {
    const [selectingPerson, setSelectingPerson] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClickEditButton = (i) => {
        setSelectingPerson(i);
        handleShow();
    }

    return (
        <Container className="mt-4">
            <Table striped bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skill</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_DATA.map(i =>
                        <tr className="text-center">
                            <td>{i.name}</td>
                            <td>{i.age}</td>
                            <td>{i.skill}</td>
                            <td>{i.department}</td>
                            <td><Button onClick={() => {onClickEditButton(i)}}>Edit</Button></td>
                        </tr>)
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Person Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control placeholder="Name" value={selectingPerson && selectingPerson.name} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Age
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control placeholder="Age" value={selectingPerson && selectingPerson.age}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Skill
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control placeholder="Skill" value={selectingPerson && selectingPerson.skill}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" value={selectingPerson && selectingPerson.department}>
                            Department
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control placeholder="Department" />
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
        </Container>
    );
}


