import React from 'react'
import './File.scss'

export default function File({file}) {
    // use file.url to show the file in new window

    function handleButtonClick(event) {

    }

    return (
        <button className={'file-button'}
        onClick={handleButtonClick}>
            <img src={file.url}
                 alt={file.name}/>
            <span>{file.name}</span>
        </button>
    )
}
