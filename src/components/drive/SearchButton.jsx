import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";

function SearchButton() {

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])

    console.log(fileQueryCards)
    useEffect(() => {
        database.files.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(filesSnapshot => {
                const tempFileQueryCards = []
                if (query !== '')
                    filesSnapshot.docs.forEach(doc => {
                        tempFileQueryCards.push(<File key={doc.id} file={doc.data()} />)
                    })
                setFileQueryCards(tempFileQueryCards)
            })
        database.folders.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(foldersSnapshot => {
                const tempFolderQueryCards = []
                if (query !== '')
                    foldersSnapshot.docs.forEach(doc => {
                        tempFolderQueryCards.push(<Folder key={doc.id} folder={doc.data()} />)
                    })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <Button onClick={() => setOpen(true)}
                variant='outline-dark'
                size='md'
                className='m-2 search-btn'>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>
                    <Form.Control
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </Modal.Header>
                {!(folderQueryCards.length === 0 && fileQueryCards.length === 0 && query === '') ?
                    <>
                        {folderQueryCards}
                        <hr />
                        {fileQueryCards}
                    </>
                    : <span className='py-3 px-2 text-center'>Nothing to show for now!</span>}
            </Modal>
        </>
    );
}

export default SearchButton;