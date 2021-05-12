import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col, Spinner } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

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

const UPDATE_EMPLOYEE = gql `
    mutation updateEmployee($id: String, $employee: NewEmployee) {
        updateEmployee(id: $id, employee: $employee) {
            resultCode
        }
    }
`

export const EditModal = ({ show, handleClose, selectedPerson, refresh }) => {
    const [editPerson, setEditPerson] = useState(null);
    const [getPositions, { called: calledGetListPosition, loading: loadingGetListPosition, data: dataGetListPosition }] = useLazyQuery(GET_LIST_POSITION);
    const [getDepartments, { called: calledGetListDepartment, loading: loadingGetListDepartment, data: dataGetListDepartment }] = useLazyQuery(GET_LIST_DEPARTMENT);
    const [updateEmployee, { data: dataUpdateEmployee, loading: loadingUpdateEmployee }] = useMutation(UPDATE_EMPLOYEE);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormChange = (e) => {
        editPerson[e.target.id] = e.target.value;
        console.log(editPerson)
        setEditPerson({...editPerson});
    }

    const handleSelectChange = (e) => {
        let clone = {...editPerson[e.target.id]};
        clone[e.target.id + 'Id'] = e.target.value;
        setEditPerson({
            ...editPerson,
            [e.target.id]: {...clone}
        });
    }

    useEffect(() => {
        if(show) {
            setEditPerson({...selectedPerson});
            if(!dataGetListPosition) {
                getPositions()
            }
            if(!dataGetListDepartment) {
                getDepartments()
            } 
        } else {
            setEditPerson(null);
        }
    }, [show])

    useEffect(() => {
        if(!loadingUpdateEmployee && dataUpdateEmployee) {
            setIsSubmitting(false);
            refresh();
        }
    }, [loadingUpdateEmployee])

    const submitForm = () => {
        setIsSubmitting(true);
        updateEmployee({
            variables: {
                id: selectedPerson.id,
                employee: {
                    name: editPerson.name,
                    age: editPerson.age,
                    gender: editPerson.gender,
                    dayOfBirth: editPerson.dayOfBirth,
                    address: editPerson.address,
                    mobileNumber: editPerson.mobileNumber,
                    position: editPerson.position.positionId,
                    department:editPerson.department.departmentId
                }
            }
        })
    }

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
                <Form.Group as={Row} controlId="gender" className="my-3">
                    <Form.Label column sm="3">Gender</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleFormChange} value={(editPerson && editPerson.gender)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dayOfBirth"
                    className="my-3">
                    <Form.Label column sm="3">
                        Day Of Birth
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="DOB"
                            value={(editPerson && editPerson.dayOfBirth) || ''}
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
                            value={(editPerson && editPerson.address) || ''}
                            onChange={handleFormChange}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="mobileNumber"
                    className="my-3">
                    <Form.Label column sm="3">
                        Phone
                        </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Phone Number"
                            value={(editPerson && editPerson.mobileNumber) || ''}
                            onChange={handleFormChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="position" className="my-3">
                    <Form.Label column sm="3">Position</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleSelectChange} value={(editPerson && editPerson.position && editPerson.position.positionId) || '3'}>
                            {loadingGetListPosition ? <option>Loading.....</option> : (dataGetListPosition && dataGetListPosition.getListPosition && dataGetListPosition.getListPosition.map(i => <option value={i.positionId}>{i.description}</option>))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="department" className="my-3">
                    <Form.Label column sm="3">Department</Form.Label>
                    <Col sm="9">
                        <Form.Control as="select" onChange={handleSelectChange} value={(editPerson && editPerson.department && editPerson.department.departmentId) || ''}>
                            {loadingGetListDepartment ? <option>Loading.....</option> : (dataGetListDepartment && dataGetListDepartment.getListDepartment && dataGetListDepartment.getListDepartment.map(i => <option value={i.departmentId}>{i.description}</option>))}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={submitForm}>
                    {isSubmitting ? <Spinner animation="border" variant="light" size="sm"/> : 'Edit'}
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}