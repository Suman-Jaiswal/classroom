import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import fbConfig from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";
import './SearchButton.scss'

function SearchButton() {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])

    useEffect(() => {
        fbConfig.firestore().collection('files').where('name', '==', query.toLowerCase())
            .get()
            .then(filesSnapshot => {
                const tempFileQueryCards = []
                filesSnapshot.docs.forEach(doc => {
                    tempFileQueryCards.push(<File key={doc.id} file={doc.data()}/>)
                })
                setFileQueryCards(tempFileQueryCards)
            })
        fbConfig.firestore().collection('folders').where('name', '==', query.toLowerCase())
            .get()
            .then(foldersSnapshot => {
                const tempFolderQueryCards = []
                foldersSnapshot.docs.forEach(doc => {
                    tempFolderQueryCards.push(<Folder key={doc.id} folder={doc.data()}/>)
                })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <Button onClick={() => setOpen(true)}
                    variant='outline-primary'
                    size='md'
                    className='m-2'>
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>
                    <Form.Control
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </Modal.Header>
                {!(folderQueryCards.length === 0 && fileQueryCards.length === 0) ?
                    <>
                        {folderQueryCards}
                        <hr/>
                        {fileQueryCards}
                    </>
                    : <span className={'search-null-text'}>Nothing to show for now!</span>}
            </Modal>
        </>
    );
}

export default SearchButton;