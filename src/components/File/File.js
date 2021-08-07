import React, {useEffect, useState} from 'react'
import './File.scss'
import DeleteBtn from '../drive/DeleteBtn';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faFile} from "@fortawesome/free-solid-svg-icons";
import {Button, Modal} from "react-bootstrap";
import DownloadBtn from "../drive/DownloadBtn";

const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'bmp']
const documentsExtensions = ['pdf']

export default function File({file}) {

    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [pdfModalOpen, setPdfModalOpen] = useState(false)
    const [fileExpanded, setFileExpanded] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [isPdf, setIsPdf] = useState(false)

    useEffect(() => {

        const fileExtension = file.name.slice(file.name.indexOf('.') + 1).toLowerCase()

        if (imageExtensions.includes(fileExtension))
            setIsImage(true)
        else if (documentsExtensions.includes(fileExtension))
            setIsPdf(true)
    }, [file.name])

    function handleFileOptionsClick() {
        setFileExpanded(!fileExpanded)
    }

    return (
        <div className={'file-wrapper'}>
            {isImage ?
                <div
                    className={'preview-file-button'}
                    onClick={() => setImageModalOpen(!imageModalOpen)}>
                    <img src={file.url} alt={file.name}/>
                    <span>{file.name}</span>
                </div> :
                isPdf ?
                    <div className={'preview-file-button'}
                         onClick={() => setPdfModalOpen(true)}>
                        <iframe
                            src={file.url}
                            frameBorder="0"
                            title={file.name}
                            height='96'/>
                        <span>{file.name}</span>
                    </div>
                    : <a target='_blank' rel="noreferrer" href={file.url}
                         className={'preview-file-button'}>
                        <FontAwesomeIcon icon={faFile}
                                         size={'3x'}/>
                        <span>{file.name}</span>
                    </a>
            }

            <Modal show={pdfModalOpen}
                   onHide={() => setPdfModalOpen(false)}
                   size='lg'
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header>
                    {file.name}
                    <Button variant='danger'
                            size='sm'
                            className='right'
                            onClick={() => setPdfModalOpen(false)}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <iframe src={file.url}
                            frameBorder="0"
                            height='600px'
                            width='100%'
                            title={file.name}/>
                </Modal.Body>
            </Modal>

            <div className={'file-options'}
                 onClick={handleFileOptionsClick}>
                <div className={"file-options-buttons-wrapper"}
                     style={fileExpanded ? {maxHeight: '100px'} : {maxHeight: '0'}}>
                    <div style={fileExpanded ? {display: 'flex'} : {display: 'none'}}>
                        <DeleteBtn id={file.id}
                                   type='file'/>
                        <DownloadBtn downloadUrl={file.url}
                                     name={file.name}/>
                    </div>
                </div>
                <div className={'options-caret-wrapper'}>
                    {fileExpanded ?
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            onClick={handleFileOptionsClick}/>
                        : <FontAwesomeIcon
                            icon={faCaretUp}
                            onClick={handleFileOptionsClick}/>}
                </div>
            </div>

            <Modal show={imageModalOpen}
                   onHide={() => setImageModalOpen(false)}
                   className={'image-preview-modal'}>
                <img src={file.url} alt={file.name}/>
            </Modal>
        </div>
    )
}
