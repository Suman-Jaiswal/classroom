import React from 'react'
import AddFolderBtn from './AddFolderBtn'
import Navbar from '../NavbarComponent/NavbarComponent'
import FolderBreadcrumbs from './FolderBreadcrubs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from './Folder'
import {useParams} from 'react-router-dom'


export default function Dashboard() {
    const {folderId} = useParams()
    const {folder, childFolders} = useFolder(folderId)

    return (
        <>
            <Navbar/>
            <Container fluid className='mt-2'>
                <div className="d-flex align-center">
                    <FolderBreadcrumbs currentFolder={folder}/>
                    <AddFolderBtn currentFolder={folder}/>
                </div>
                {
                    childFolders.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {childFolders.map(childFolder => (
                                <div className='p-2' key={childFolder.id}>
                                    <Folder folder={childFolder}/>
                                </div>
                            ))}
                        </div>
                    )
                }
            </Container>
        </>
    )
}
