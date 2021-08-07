import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {database} from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";
import ReactTooltip from "react-tooltip";

function SearchButton() {

    const ref1 = useRef(null)
    const [tooltipReference, setTooltipReference] = useState(null)

    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])

    const openModal = () => {
        setOpen(true)
        setTimeout(() => {
            ref1.current?.focus()
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
                        tempFileQueryCards.push(<File key={doc.id} file={doc.data()}/>)
                    })
                setFileQueryCards(tempFileQueryCards)
            })
        database.folders.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(foldersSnapshot => {
                const tempFolderQueryCards = []
                if (query !== '')
                    foldersSnapshot.docs.map(doc => {
                        const folder = {id: doc.id, ...doc.data()}
                        return tempFolderQueryCards.push(<Folder key={doc.id} folder={folder} closeModal={closeModal}/>)
                    })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <p ref={ref => setTooltipReference(ref)}
               data-tip='Search'
               data-place='left'
               data-offset="{'top': -5, 'left': -10}"/>
            <ReactTooltip/>
            <Button onClick={openModal}
                    variant={'outline-primary'}
                    size='sm'
                    className='mb-1 search-btn'
                    onMouseEnter={() => ReactTooltip.show(tooltipReference)}
                    onMouseLeave={() => ReactTooltip.hide(tooltipReference)}>
                <FontAwesomeIcon icon={faSearch}/>
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Modal.Header>
                    <Form.Control
                        inline
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        ref={ref1}
                        placeholder='Search...'/>
                    <FontAwesomeIcon icon={faTimes}
                                     style={{position: 'relative', top: '0px', right: '20px'}}
                                     onClick={() => setQuery('')}
                                     opacity={query === '' ? '0' : '1'}/>

                </Modal.Header>
                <Modal.Body className='search-body-wrapper'>
                    {!(folderQueryCards.length === 0 && fileQueryCards.length === 0) ?
                        <>
                            {folderQueryCards}
                            <hr/>
                            {fileQueryCards}
                        </>
                        : <span style={{margin: "auto"}}
                                className='py-3 px-2'>
                        Nothing to show for now!</span>}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SearchButton;
