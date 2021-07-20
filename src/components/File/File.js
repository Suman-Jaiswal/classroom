import React, {useState} from 'react'
import './File.scss'
import {Modal} from "react-bootstrap";
import FileViewer from 'react-file-viewer';
import {CustomErrorComponent} from 'custom-error';

export default function File({file}) {
    // use file.url to show the file in new window

    const [open, setOpen] = useState(false)

    function handleButtonClick() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function errorHandler() {
        console.log('error occurred!')
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
                <Modal.Body>
                    <FileViewer
                        fileType={'png'}
                        filePath={file.url}
                        errorComponent={CustomErrorComponent}
                        onError={errorHandler}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}
