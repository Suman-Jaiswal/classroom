import {Button} from 'react-bootstrap'
import React from 'react'
import {Link} from 'react-router-dom'
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Folder.scss'
import RenameBtn from '../drive/RenameBtn';
import DeleteBtn from '../drive/DeleteBtn';

export default function Folder({folder}) {

    // folder id for years should remain same in the firebase as here!
    if (folder.id === 'tc0IQ0FQ0gVQelfDVbVh' ||
        folder.id === 'bwGBb34xtmbhIcO130BE' ||
        folder.id === 'K8asGgUIDL1kNLUJh8Qp' ||
        folder.id === 'XvizCjW6t1M0pZt43saZ'
    ) {
        return (
            <Button variant='transparent' className='year-card' as={Link}
                    to={{pathname: `/folders/${folder.id}`, state: {folder}}}>
                <img src={`img/years/${folder.name}.svg`} alt={folder.name}/>
                <h3>{folder.name}</h3>
            </Button>
        )
    } else {
        return (
            <div className='folder-wrapper'>
            <RenameBtn currentFolder={folder} />
            <DeleteBtn currentFolder={folder} />
            <Button variant='transparent' className='folder-card' as={Link}
                    to={{pathname: `/folders/${folder.id}`, state: {folder}}}>
                <FontAwesomeIcon icon={faFolder}/>
                <span>{folder.name}</span>
            </Button>
            </div>
        )
    }
}
