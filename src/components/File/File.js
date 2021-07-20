import React from 'react'
import './File.scss'
import { Button } from "react-bootstrap";

export default function File({ file }) {
    // use file.url to show the file in new window

    return (
        <Button variant={'transparent'} className={'file-button outline'}>
            <a target="_blank" href={file.url} rel="noreferrer">
                <img src={file.url} alt={file.name}  style={{width: "100px"}} />
            </a>
            <span>{file.name}</span>
        </Button>
    )
}
