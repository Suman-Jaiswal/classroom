import {faFile} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'

export default function File({file}) {
    return (
        <div>
            <a href={file.url} target="_blank" rel="noreferrer" className='btn btn-outline-dark text-truncate mw-100'>
                <FontAwesomeIcon icon={faFile} size='lg' className='mr-2'/>
                <p>{file.name}</p>
            </a>
        </div>
    )
}
