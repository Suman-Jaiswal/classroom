import React from 'react'
import './DashboardPage.scss'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrumbs'
import { Container } from 'react-bootstrap'
import { useFolder } from '../../hooks/useFolder'
import Folder from '../../components/Folder/Folder'
import File from '../../components/File/File'
import { useLocation, useParams } from 'react-router-dom'
import AddFileBtn from '../../components/drive/AddFileBtn'

export default function DashboardPage() {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)


    return (
        <Container fluid className='mt-2'>
            <div className="d-flex align-center px-2">
                <FolderBreadcrumbs currentFolder={folder} />
                <AddFolderBtn currentFolder={folder} />
                <AddFileBtn currentFolder={folder} />
            </div>

                <div className='px-3'>
                <span>Folders: ({childFolders.length}) </span>
                <span>Files: ({childFiles.length})</span>
            </div>
            {childFolders.length > 0 ?
                <div className={'dashboard-cards-wrapper'}>
                    {childFolders.map(childFolder => (
                        <Folder key={childFolder.id} folder={childFolder} />
                    ))}
                </div>
                : null}

            {(childFiles.length > 0 && childFolders.length > 0) ? <hr /> : null}
            {(childFiles.length === 0 && childFolders.length === 0) ? <div className="empty"><img src="/img/empty-box.png" alt="Empty" /></div> : null}
            
            {childFiles.length > 0 ?
                <div className="dashboard-cards-wrapper">
                    {childFiles.map(childFile => (
                        <File key={childFile.id} file={childFile} />
                    ))}
                </div>
                : null}
        
        </Container>
    )

}
