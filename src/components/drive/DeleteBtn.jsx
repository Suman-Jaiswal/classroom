import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { database } from '../../fbConfig';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteBtn({ currentFolder }) {

    const [open, setOpen] = useState(false)
  
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        setOpen(false)
        
        // database.files.where('folderId', '==', currentFolder.id).delete().then(() => {
        //     console.log("Files successfully deleted!");
        // }).catch((error) => {
        //     console.error("Error removing document: ", error);
        // });

        database.folders.doc(currentFolder.id).delete().then(() => {
            console.log("Folder successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        
    }


    return (
        <>
            <Button onClick={openModal} variant='transparent' style={{ }} >
                <FontAwesomeIcon icon={faTrash} style={{width: '10px', height: '10px', }} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                    <Modal.Body>
                        Confirm Delete!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant='secondary' onClick={handleDelete} type='submit'>
                            Confirm
                        </Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}
