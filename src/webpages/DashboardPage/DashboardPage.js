import React from 'react'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrubs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/drive/Folder'
import File from '../../components/drive/File'
import {useParams} from 'react-router-dom'
import AddFileBtn from '../../components/drive/AddFileBtn'

export default function DashboardPage() {
    const {folderId} = useParams()
    const {folder, childFolders, childFiles} = useFolder(folderId)

    return (
        <>
            <Container fluid className='mt-2'>
                <div className="d-flex align-center">
                    <FolderBreadcrumbs currentFolder={folder}/>
                    <AddFolderBtn currentFolder={folder}/>
                    <AddFileBtn currentFolder={folder}/>
                </div>
                <div className="content-count">
                    Folders: {childFolders.length}, Files: {childFiles.length}
                </div>
                <hr/>
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
                {childFiles.length > 0 && childFolders.length > 0 && <hr/>}
                {
                    childFiles.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {childFiles.map(childFile => (
                                <div className='p-2' key={childFile.id}>
                                    <File file={childFile}/>
                                </div>
                            ))}
                        </div>
                    )
                }

            </Container>
        </>
    )
}
