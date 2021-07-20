import React from 'react'
import './DashboardPage.scss'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrumbs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/Folder/Folder'
import File from '../../components/File/File'
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
            <Container fluid className='mt-2'>
                <div className="d-flex align-center">
                    <FolderBreadcrumbs currentFolder={folder}/>
                    <AddFolderBtn currentFolder={folder}/>
                    <AddFileBtn currentFolder={folder}/>
                </div>
                {childFolders.length > 0 ?
                    <div className={'dashboard-cards-wrapper'}>
                        {childFolders.map(childFolder => (
                            <Folder key={childFolder.id} folder={childFolder}/>
                        ))}
                    </div>
                    : null}
                {(childFiles.length > 0 && childFolders.length > 0) ? <hr/> : null}
                {childFiles.length > 0 ?
                    <div className="dashboard-cards-wrapper">
                        {childFiles.map(childFile => (
                            <File key={childFile.id} file={childFile}/>
                        ))}
                    </div>
                    : null}
            </Container>
        )
    }
}
