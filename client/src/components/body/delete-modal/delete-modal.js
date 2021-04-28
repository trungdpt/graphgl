import React, { useEffect, useState } from 'react';
import { Row, Button, Modal, Form, Col } from 'react-bootstrap';

export const DeleteModal = ({ show, handleClose, selectedPerson }) => {
    const [deletePerson, setDeletePerson] = useState(null);

    useEffect(() => {
        if(show) {
            setDeletePerson(selectedPerson)
        } else {
            setDeletePerson(null);
        }
    }, [show])

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Delete Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this person: {(deletePerson && deletePerson.name) || ''} ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Delete
                     </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}