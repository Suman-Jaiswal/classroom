import React, { useState, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { database } from '../../fbConfig'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddFolderBtn({ currentFolder }) {
    const myRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    const openModal = () => {
        setOpen(true)
        setTimeout(() => {
            myRef.current.focus()
        }, 100);
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (!(currentFolder === null)) {
            const path = [...currentFolder.path]
            if (currentFolder !== ROOT_FOLDER) {
                path.push({ name: currentFolder.name, id: currentFolder.id })
                console.log('pushed')
            }
            database.folders.add({
                name,
                parentId: currentFolder.id,
                path,
                createdAt: database.timeStamp
            })
            setName('')
        }
    }

    return (
        <>
            <Button onClick={openModal} variant='transparent text-primary' size='md' className='ms-3 mt-1 p-0'>
                <FontAwesomeIcon icon={faFolderPlus} />
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
                                value={name}
                                onChange={e => setName(e.target.value)}
                                ref={myRef}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal} type='submit'>
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
