import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';

const GET_LIST_POSITION = gql`
    query {
        getListPosition {
            positionId
            description
        }
    }
`;

const GET_LIST_DEPARTMENT = gql`
    query {
        getListDepartment {
            departmentId
            description
        }
    }
`;

export const CreateModal = ({ show, handleClose }) => {
    const [getPositions, { called: calledGetListPosition, loading: loadingGetListPosition, data: dataGetListPosition }] = useLazyQuery(GET_LIST_POSITION);
    const [getDepartments, { called: calledGetListDepartment, loading: loadingGetListDepartment, data: dataGetListDepartment }] = useLazyQuery(GET_LIST_DEPARTMENT);
    const [createPerson, setCreatePerson] = useState(null);
    const [positions, setPositions] = useState();

    const handleFormChange = (e) => {
        createPerson[e.target.id] = e.target.value;
        setCreatePerson({ ...createPerson });
    }

    const submitForm = () => {
        console.log(createPerson);
    }

    useEffect(() => {
        if (show) {
            setCreatePerson({
                name: '',
                age: '',
                gender: 'Male',
                dayOfBirth: '',
                address: '',
                mobileNumber: '',
                position: '1',
                department: '1'
            });
            getPositions();
            getDepartments();
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
                <Form.Group as={Row} controlId="gender" className="my-3">
                    <Form.Label column sm="3">Gender</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleFormChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="DOB"
                    className="my-3">
                    <Form.Label column sm="3">
                        Day Of Birth
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="DOB"
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="address"
                    className="my-3">
                    <Form.Label column sm="3">
                        Address
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Address"
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="mobileNumber"
                    className="my-3">
                    <Form.Label column sm="3">
                        Mobile Number
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Mobile Number"
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="position" className="my-3">
                    <Form.Label column sm="3">Position</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleFormChange}>
                            {loadingGetListPosition ? <option>Loading.....</option> : (dataGetListPosition && dataGetListPosition.getListPosition && dataGetListPosition.getListPosition.map(i => <option value={i.positionId}>{i.description}</option>))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="department" className="my-3">
                    <Form.Label column sm="3">Department</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleFormChange}>
                            {loadingGetListDepartment ? <option>Loading.....</option> : (dataGetListDepartment && dataGetListDepartment.getListDepartment && dataGetListDepartment.getListDepartment.map(i => <option value={i.departmentId}>{i.description}</option>))}
                        </Form.Control>
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