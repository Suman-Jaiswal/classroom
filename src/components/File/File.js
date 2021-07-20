import {faFile} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import './File.scss'
import {Button} from "react-bootstrap";

export default function File({file}) {
    // use file.url to show the file in window

    const [hover, setHover] = useState(false)

    const image =
        <img src={file.url}
             alt={'thumbnail'}
             className={'file-thumbnail'}
        /> // preload the image

    function handleMouseEnter() {
        setHover(true)
    }

    function handleMouseLeave() {
        setHover(false)
    }

    return (
        <Button variant={'transparent'} className={'file-button'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
            {
                hover ?
                    image :
                    <>
                        <FontAwesomeIcon icon={faFile}/>
                        <span>{file.name}</span>
                    </>
            }
        </Button>
    )
}
