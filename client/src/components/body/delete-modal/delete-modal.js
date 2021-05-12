import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col, Spinner } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const DELETE_EMPLOYEE = gql `
    mutation deleteEmployee($id: String) {
        deleteEmployeeById(id: $id) {
            resultCode
        }
    }
`

export const DeleteModal = ({ show, refresh, selectedPerson, handleClose }) => {
    const [deleteEmployee, { data: dataDeleteEmployee, loading: loadingDeleteEmployee }] = useMutation(DELETE_EMPLOYEE);
    const [deletePerson, setDeletePerson] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(show) {
            setDeletePerson(selectedPerson)
        } else {
            setDeletePerson(null);
        }
    }, [show])

    const submitDelete = () => {
        setIsSubmitting(true);
        deleteEmployee({ 
            variables: {
                id: deletePerson.id
            }
        });
    } 

    useEffect(() => {
        if(!loadingDeleteEmployee && dataDeleteEmployee) {
            setIsSubmitting(false);
            refresh();
        }
    }, [loadingDeleteEmployee])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Delete Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this person: {(deletePerson && deletePerson.name) || ''} ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={submitDelete}>
                    {isSubmitting ? <Spinner animation="border" variant="light" size="sm"/> : 'Delete' }
                     </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}