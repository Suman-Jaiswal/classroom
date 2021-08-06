import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { faCaretDown, faCaretUp, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Folder.scss'
import RenameBtn from '../drive/RenameBtn';
import DeleteBtn from '../drive/DeleteBtn';

export default function Folder({ folder, closeModal }) {

    const [folderExpanded, setFolderExpanded] = useState(false)

    function handleFolderOptionsClick() {
        setFolderExpanded(!folderExpanded)
    }

    // folder id for years should remain same in the firebase as here!
    if (folder.id === 'tc0IQ0FQ0gVQelfDVbVh' ||
        folder.id === 'bwGBb34xtmbhIcO130BE' ||
        folder.id === 'K8asGgUIDL1kNLUJh8Qp' ||
        folder.id === 'XvizCjW6t1M0pZt43saZ'
    ) {
        document.body.style.background = `url('/img/background.svg') fixed no-repeat`
        document.body.style.backgroundSize = `cover`
        return (
            <Button variant='transparent' className='year-card' as={Link}  onClick={closeModal}
                to={{ pathname: `/folders/${folder.id}`, state: { folder } }}>
                <img src={`img/years/${folder.name}.svg`} alt={folder.name} />
                <h3>{folder.name}</h3>
            </Button>
        )
    } else {
        document.body.style.background = 'none'
        return (
            <div className={'folder-wrapper'}>
                <Link
                    className={'open-folder-button'}
                    to={{ pathname: `/folders/${folder.id}`, state: { folder } }} onClick={closeModal}>

                    <FontAwesomeIcon icon={faFolder} size={'3x'} />
                    <span>{folder.name}</span>
                </Link>

                <div className={'folder-options'}
                    onClick={handleFolderOptionsClick}>
                    <div className="folder-options-buttons-wrapper"
                        style={folderExpanded ? { maxHeight: '100px' } : { maxHeight: '0' }}>
                        <div style={folderExpanded ? { display: 'flex' } : { display: 'none' }}>
                            <RenameBtn currentFolder={folder} />
                            <DeleteBtn id={folder.id} type='folder' />
                        </div>
                    </div>
                    <div className={'options-caret-wrapper'}>
                        {folderExpanded ?
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                onClick={handleFolderOptionsClick} />
                            : <FontAwesomeIcon
                                icon={faCaretUp}
                                onClick={handleFolderOptionsClick} />}
                    </div>
                </div>
            </div>
        )
    }
}
