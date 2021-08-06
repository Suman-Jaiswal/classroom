import React from 'react'
import './DashboardPage.scss'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrumbs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/Folder/Folder'
import File from '../../components/File/File'
import {useLocation, useParams} from 'react-router-dom'
import AddFileBtn from '../../components/drive/AddFileBtn'
import {PulseLoader as Loader} from "react-spinners";
import CopyBtn from '../../components/drive/CopyBtn'
import SearchButton from "../../components/drive/SearchButton";

export default function DashboardPage() {

    const {folderId} = useParams()
    const {state = {}} = useLocation()
    const {folder, childFolders, childFiles, loaded} = useFolder(folderId, state.folder)

    return (
        <Container fluid className='dashboard-container'>
            <div className="d-flex align-center px-1 top">
                <FolderBreadcrumbs currentFolder={folder}/>
                <SearchButton/>
                <AddFolderBtn currentFolder={folder}/>
                <AddFileBtn currentFolder={folder}/>
                <CopyBtn/>
            </div>
            {loaded ?
                    <>
                        <div className='px-1 count'>
                            <span>Folders: ({childFolders.length}) </span>
                            <span>Files: ({childFiles.length})</span>
                        </div>
                        {childFolders.length > 0 ?
                            <div className={'dashboard-cards-wrapper'}>
                                {childFolders.map(childFolder => (
                                    <Folder key={childFolder.id} folder={childFolder}/>
                                ))}
                            </div>
                            : null}

                        {(childFiles.length > 0 && childFolders.length > 0) ? <hr/> : null}

                        {(childFiles.length === 0 && childFolders.length === 0 && loaded) ?
                            <div className="empty">
                                <img src={"/img/empty-box.png"} alt="Empty"/>
                                <h5>Empty !</h5>
                            </div>
                            : null}

                        {childFiles.length > 0 ?
                            <div className="dashboard-cards-wrapper">
                                {childFiles.map(childFile => (
                                    <File key={childFile.id} file={childFile}/>
                                ))}
                            </div>
                            : null}
                    </>

                    : <Loader loading={true} size={15}
                              css={{position: "absolute", top: "50%", left: "calc(50% - 25px)"}}/>
            }
        </Container>
    )
}
