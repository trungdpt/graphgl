import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Table, Container, Row, Button, Modal, Form, Col, Toast, Pagination, Spinner } from 'react-bootstrap';
import { MOCK_DATA } from '../../services/mock-data';
import { EditModal } from './edit-modal/edit-modal';
import { CreateModal } from './create-modal/create-modal';
import { DeleteModal } from './delete-modal/delete-modal';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const PAGE_SIZE = 12;
const DEFAULT_PAGE = 1;

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

const GET_EMP_PAG = gql`
    query getAllEmployeePagination($page: Int, $size: Int) {
      getAllEmployeePagination(page: $page, size: $size ) {
      totalRecord,
      totalPage,
      pageIndex,
      data {
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
  }
`;


export const Body = () => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [loadEmployees, { loading, data, refetch }] = useLazyQuery(GET_EMP_PAG, {
        variables: {
            page: currentPage,
            size: PAGE_SIZE
        },
        fetchPolicy: 'network-only'
    });
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [isEditModalShown, setIsEditModalShown] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [employees, setEmployees] = useState([])
    const [totalRecord, setTotalRecord] = useState(0);

    useEffect(() => {
        loadEmployees()
    }, [])

    useEffect(() => {
        if (!loading && data) {
            setEmployees(data.getAllEmployeePagination.data);
            setTotalRecord(data.getAllEmployeePagination.totalRecord);
        }
    }, [loading, data])

    useEffect(() => {
        if(refetch) {
            refetch();
        } else {
            loadEmployees();
        }
    }, [currentPage])

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

    const changePage = (number) => {
        setCurrentPage(number);
    }

    let paginationItems = [];
    let totalPage = totalRecord % PAGE_SIZE > 0 ? totalRecord/PAGE_SIZE + 1 : totalRecord/PAGE_SIZE
    for (let number = 1; number <= totalPage; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => {
                changePage(number);
            }}>
                {number}
            </Pagination.Item>,
        );
    }

    const refresh = () => {

        if (isCreateModalShown) {
            handleCreateModalClose();
        }
        if (isDeleteModalShown) {
            hideDeleteModal();
        }
        if (isEditModalShown) {
            handleEditModalClose();
        }
        refetch();
    }

    // if (loading) {
    //     return <p>Loading...</p>;
    // } else {
    return <div className="position-relative">
        <Container className="mt-4">
            <Button variant="success" className="m-2" onClick={showCreateModal}>Create</Button>
            <div className="position-relative">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Phone</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees && employees.length > 0 && employees.map(i =>
                            <tr className="text-center">
                                <td className="p-3">{i.name}</td>
                                <td>{i.gender}</td>
                                <td>{i.dayOfBirth}</td>
                                <td>{i.mobileNumber}</td>
                                <td>{i.position.description}</td>
                                <td>{i.department.description}</td>
                                <td>
                                    <Row>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <Row>
                                                <Col>
                                                    <Button className="me-1 w-100" onClick={() => { showEditModal(i) }}>Edit</Button>
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
                {loading && <div className="overlay">
                        <div className="overlay__wrapper">
                            <Spinner animation="border" variant="light" className="overlay__spinner" />
                        </div>
                </div>}
            </div>
            <CreateModal show={isCreateModalShown} handleClose={handleCreateModalClose} refresh={refresh} />
            <EditModal show={isEditModalShown} handleClose={handleEditModalClose} selectedPerson={selectedPerson} refresh={refresh} />
            <DeleteModal show={isDeleteModalShown} refresh={refresh} handleClose={hideDeleteModal} selectedPerson={selectedPerson} />
            <div className="m-2 d-flex justify-content-center">
                <Pagination>
                    {paginationItems}
                </Pagination>
            </div>
        </Container>

    </div>
}

