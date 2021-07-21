import React, {useState} from 'react'
import './File.scss'
import {Modal} from "react-bootstrap";

export default function File({file}) {
    // use file.url to show the file in new window

    const [open, setOpen] = useState(false)

    function handleButtonClick() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    return (
        <div>
            <button className={'file-button'}
                    onClick={handleButtonClick}>
                <img src={file.url}
                     alt={file.name}/>
                <span>{file.name}</span>
            </button>
            <Modal show={open}
                   onHide={closeModal}>
                <embed src={file.url} className={'modal-file-view'}/>
            </Modal>
        </div>
    )
}
