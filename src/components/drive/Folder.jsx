import {Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Folder({folder}) {

    const [isYearFolder, setIsYearFolder] = useState(true)

    useEffect(() => {

        // folder id for years should remain same in the firebase as here!
        if (folder.id === 'tc0IQ0FQ0gVQelfDVbVh' ||
            folder.id === 'bwGBb34xtmbhIcO130BE' ||
            folder.id === 'K8asGgUIDL1kNLUJh8Qp' ||
            folder.id === 'XvizCjW6t1M0pZt43saZ'
        ) {
            setIsYearFolder(true)
        } else {
            setIsYearFolder(false)
        }

    }, [folder.id])


    return (
        <Button variant='transparent' className={'year-card'} as={Link}
                to={{pathname: `/folders/${folder.id}`, state: {folder}}}>
            {isYearFolder ?
                <img src={`img/years/${folder.name}.svg`} alt={folder.name}/>
                : <FontAwesomeIcon icon={faFolder}/>}
            {isYearFolder ?
                <h3>{folder.name}</h3>
                : <h6>{folder.name}</h6>}
        </Button>
    )
}
