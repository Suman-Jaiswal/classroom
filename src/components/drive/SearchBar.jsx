import React, {useEffect, useRef, useState} from 'react';
import {database} from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Form} from 'react-bootstrap';


function SearchBar() {

    const ref1 = useRef(null)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])

    const closeModal = () => {
        setQuery('')
    }

    useEffect(() => {
        database.files.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(filesSnapshot => {
                const tempFileQueryCards = []
                if (query !== '')
                    filesSnapshot.docs.forEach(doc => {
                        tempFileQueryCards.push(<File closeModal={closeModal} key={doc.id} file={doc.data()}/>)
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
                        return tempFolderQueryCards.push(<Folder closeModal={closeModal} key={doc.id} folder={folder}/>)
                    })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <div className="search-container">
                <div className="search-control-wrapper">
                    <Form.Control
                        inline
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        ref={ref1}
                        placeholder='Search...'/>
                    <FontAwesomeIcon icon={faTimes}
                                     style={{position: 'relative', top: '10px', right: '20px'}}
                                     onClick={() => setQuery('')}
                                     opacity={query === '' ? '0' : '1'}/>
                </div>
                {!(folderQueryCards.length === 0 && fileQueryCards.length === 0 && query === '') ?
                    <div className="body-wrapper">
                        <div className='body'>
                            {folderQueryCards}
                            {fileQueryCards}
                        </div>
                    </div>
                    : null}
            </div>
        </>
    );
}

export default SearchBar;
