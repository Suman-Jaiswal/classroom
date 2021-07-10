import React from 'react'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrubs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/drive/Folder'
import {useParams} from 'react-router-dom'

export default function DashboardPage() {
    const {folderId} = useParams()
    const {folder, childFolders} = useFolder(folderId)

    return (
        <>
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
