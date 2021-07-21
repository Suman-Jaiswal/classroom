import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { database } from '../../fbConfig';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function RenameBtn({ currentFolder }) {

    const [rename, setRename] = useState('')
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        database.folders.doc(currentFolder.id).update({name: rename})
        setRename('')
    }


    return (
        <>
            <Button onClick={openModal} variant='transparent' style={{ }} >
                <FontAwesomeIcon icon={faPen} style={{width: '10px', height: '10px', }} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleFormSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>
                                Folder Name
                            </Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={rename}
                                onChange={e => setRename(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal} type='submit'>
                            Rename
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
