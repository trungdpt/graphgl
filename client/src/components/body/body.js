import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Table, Container, Row, Button, Modal, Form, Col } from 'react-bootstrap';
import { MOCK_DATA } from '../../services/mock-data';
import { EditModal } from './edit-modal/edit-modal';
import { CreateModal } from './create-modal/create-modal';
import { DeleteModal } from './delete-modal/delete-modal';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_EMP = gql`
    query {
      getAllEmployee {
      id
      name
      age
      gender
      dayOfBirth
      address
      mobileNumber
      position {
          positionId
          description
      }
      department {
          departmentId
          description
      }
    }
  }
`;


export const Body = () => {
    const { loading, error, data } = useQuery(GET_ALL_EMP);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [isEditModalShown, setIsEditModalShown] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    useEffect(() => {
        console.log(data)
    }, [])


    const handleCreateModalClose = () => {
        setIsCreateModalShown(false);
    };

    const showCreateModal = () => {
        setIsCreateModalShown(true);
    }

    const handleEditModalClose = () => {
        setSelectedPerson(null);
        setIsEditModalShown(false);
    };

    const showEditModal = (item) => {
        setSelectedPerson(item);
        setIsEditModalShown(true);
    }

    const showDeleteModal = (item) => {
        setSelectedPerson(item);
        setIsDeleteModalShown(true);
    }

    const hideDeleteModal = () => {
        setSelectedPerson(null);
        setIsDeleteModalShown(false);
    }
    if (loading) {
        return <p>Loading...</p>;
    } else {
        if (data) {
            return <Container className="mt-4">
                <Button variant="success" onClick={showCreateModal}>Create</Button>
                <Table striped bordered hover className="m-2">
                    <thead>
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getAllEmployee && data.getAllEmployee.map(i =>
                            <tr className="text-center">
                                <td>{i.name}</td>
                                <td>{i.gender}</td>
                                <td>{i.dayOfBirth}</td>
                                <td>{i.mobileNumber}</td>
                                <td>
                                    <Row>
                                        <Col xs={{ span: 6, offset: 3 }}>
                                            <Row>
                                                <Col>
                                                    <Button className="me-1 w-100" onClick={() => { showEditModal(i) }}> Edit </Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="danger w-100" onClick={() => { showDeleteModal(i) }} block>Delete</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                <CreateModal show={isCreateModalShown} handleClose={handleCreateModalClose} />
                <EditModal show={isEditModalShown} handleClose={handleEditModalClose} selectedPerson={selectedPerson} />
                <DeleteModal show={isDeleteModalShown} handleClose={hideDeleteModal} selectedPerson={selectedPerson} />
            </Container>
        }
        return <div>Data invalid</div>
    }
}


