import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";

function SearchButton() {
    const myRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])

    const openModal = () => {
        setOpen(true)
        setTimeout(() => {
            myRef.current.focus()
        }, 100);
    }
    const closeModal = () => {
        setOpen(false)
        setQuery('')
    }

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
                    foldersSnapshot.docs.map(doc => {
                        const folder = { id: doc.id, ...doc.data() }
                        return tempFolderQueryCards.push(<Folder key={doc.id} folder={folder} closeModal={closeModal} />)
                    })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <Button onClick={openModal}
                variant={'outline-success'}
                size='md'
                className='m-2 search-btn'>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Modal.Header>
                    <Form.Control
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        ref={myRef}
                    />
                </Modal.Header>
                <Modal.Body>
                    {!(folderQueryCards.length === 0 && fileQueryCards.length === 0 && query === '') ?
                        <>
                            {folderQueryCards}
                            <hr />
                            {fileQueryCards}
                        </>
                        : <span className='py-3 px-2 text-center'>Nothing to show for now!</span>}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SearchButton;
