import {faFile} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import './File.scss'
import {Button} from "react-bootstrap";

export default function File({file}) {

    function handleFileClick() {
        // use file.url to show the file in window
    }

    return (
        <Button onClick={handleFileClick} className={'file-button'}>
            <FontAwesomeIcon icon={faFile}/>
            <span>{file.name}</span>
        </Button>
    )
}
