import React, { useEffect, useState } from 'react'
import './File.scss'
import DeleteBtn from '../drive/DeleteBtn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faFile } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import DownloadBtn from "../drive/DownloadBtn";

const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'bmp']

export default function File({ file }) {

    // use file.url to show the file in new window
    const [open, setOpen] = useState(false)
    const [fileExpanded, setFileExpanded] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [isPdf, setIsPdf] = useState(false)

    useEffect(() => {
        const fileExtension = file.name.slice(-3).toLowerCase()
        if (imageExtensions.includes(fileExtension)) {
            setIsImage(true)
        }
        if(fileExtension === 'pdf'){
            setIsPdf(true)
        }
    }, [file.name])

    function handleFileOptionsClick() {
        setFileExpanded(!fileExpanded)
    }

    return (
        <div className={'file-wrapper'}>
            {
                isImage ? <div
                    className={'preview-file-button'}
                    onClick={() => setOpen(!open)}>
                    <img src={file.url} alt={file.name} />
                    <span>{file.name}</span>

                </div> : isPdf? <a target='_blank' rel="noreferrer" href={file.url}
                    className={'preview-file-button'}>
                        <iframe src={file.url} frameborder="0" title={file.name} height='96' ></iframe>
                    {/* <FontAwesomeIcon icon={faFile} */}
                        {/* size={'3x'} /> */}
                    <span>{file.name}</span>

                </a>:  <a target='_blank' rel="noreferrer" href={file.url}
                    className={'preview-file-button'}>
                
                    <FontAwesomeIcon icon={faFile} 
                        size={'3x'} />
                    <span>{file.name}</span>

                </a>
            }


            <div className={'file-options'}
                onClick={handleFileOptionsClick}>
                <div className={"file-options-buttons-wrapper"}
                    style={fileExpanded ? { maxHeight: '100px' } : { maxHeight: '0' }}>
                    <div style={fileExpanded ? { display: 'flex' } : { display: 'none' }}>
                        <DeleteBtn id={file.id} type='file' />
                        <DownloadBtn downloadUrl={file.url} name={file.name} />
                    </div>
                </div>
                <div className={'options-caret-wrapper'}>
                    {fileExpanded ?
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            onClick={handleFileOptionsClick} />
                        : <FontAwesomeIcon
                            icon={faCaretUp}
                            onClick={handleFileOptionsClick} />}
                </div>
            </div>

            <Modal show={open}
                onHide={() => setOpen(false)}>
                <Modal.Body className={'file-preview-modal-body'}>
                    <embed src={file.url} />
                </Modal.Body>
            </Modal>
        </div>
    )
}
