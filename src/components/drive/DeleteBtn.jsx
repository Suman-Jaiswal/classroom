import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { database } from '../../fbConfig';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteBtn({ id, type }) {

    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        setOpen(false)

        if (type === 'folder') {
            var child_files_query = database.files.where('folderId', '==', id);
            child_files_query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });
            var child_folders_query = database.folders.where('parentId', '==', id);
            child_folders_query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });

            database.folders.doc(id).delete().then(() => {
                console.log("Folder successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }

        if (type === 'file') {
            database.files.doc(id).delete().then(() => {
                console.log("File successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }

    }


    return (
        <>
            <Button onClick={openModal} variant='transparent' style={{}} >
                <FontAwesomeIcon icon={faTrash} style={{ width: '10px', height: '10px', }} />
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
