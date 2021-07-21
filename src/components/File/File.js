import React, { useState } from 'react'
import './File.scss'
import { Modal } from "react-bootstrap";
import DeleteBtn from '../drive/DeleteBtn';

export default function File({ file }) {
    // use file.url to show the file in new window
    const [open, setOpen] = useState(false)

    function handleButtonClick() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    return (
        <>  <div>
            <DeleteBtn id={file.id} type='file' />
            <button className={'file-button'}
                onClick={handleButtonClick}>
                <img src={file.url}
                    alt={file.name} />
                <span>{file.name}</span>
            </button>
        </div>

            <Modal show={open}
                onHide={closeModal}>
                <Modal.Body>
                    <embed src={file.url} />
                </Modal.Body>
            </Modal>
        </>
    )
}
