import React from 'react'
import './DashboardPage.scss'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrumbs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/drive/Folder'
import File from '../../components/drive/File'
import {Redirect, useLocation, useParams} from 'react-router-dom'
import AddFileBtn from '../../components/drive/AddFileBtn'

export default function DashboardPage(props) {
    const {folderId} = useParams()
    const {state = {}} = useLocation()
    const {folder, childFolders, childFiles} = useFolder(folderId, state.folder)

    if (props.response == null) {
        return <Redirect to={'/'}/>
    } else {
        return (
            <>
                <Container fluid className='mt-2'>
                    <div className="d-flex align-center">
                        <FolderBreadcrumbs currentFolder={folder}/>
                        <AddFolderBtn currentFolder={folder}/>
                        <AddFileBtn currentFolder={folder}/>
                    </div>
                    {childFolders.length > 0 ?
                        <div className={'dashboard-return-wrapper'}>
                            <div className={'dashboard-subject-cards'}>
                                {childFolders.map(childFolder => (
                                    <Folder key={childFolder.id} folder={childFolder}/>
                                ))}
                            </div>
                        </div>
                        : null}
                    {(childFiles.length > 0 && childFolders.length > 0) ? <hr/> : null}
                    {childFiles.length > 0 ?
                        <div className="d-flex flex-wrap files-container">
                            {childFiles.map(childFile => (
                                <div className='p-2' key={childFile.id}>
                                    <File file={childFile}/>
                                </div>
                            ))}
                        </div>
                        : null}
                </Container>
            </>
        )
    }
}
