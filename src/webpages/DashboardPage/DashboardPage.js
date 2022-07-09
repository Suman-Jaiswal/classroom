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
import { PulseLoader as Loader } from "react-spinners";
import CopyBtn from '../../components/drive/CopyBtn'
import SearchButton from "../../components/drive/SearchButton";
import SearchBar from '../../components/drive/SearchBar'

export default function DashboardPage({ user }) {

    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles, loaded } = useFolder(folderId, state.folder)

    return (
        <>
            {user ?
                <SearchBar currentFolder={folder} />
                : null}
            <Container fluid className='dashboard-container'>
                <div className="d-flex align-center top">
                    <FolderBreadcrumbs currentFolder={folder} />
                    <div className="btns d-flex justify-content-center">
                        <SearchButton currentFolder={folder} />
                        <AddFolderBtn currentFolder={folder} />
                        <AddFileBtn currentFolder={folder} />
                        <CopyBtn />
                    </div>
                </div>
                {loaded ?
                    <>
                        <div className='count text-primary'>
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

                        {(childFiles.length === 0 && childFolders.length === 0 && loaded) ?
                            <div className="empty">
                                <img src={"/img/empty-box.webp"} alt="Empty" />
                                <h5>Empty !</h5>
                            </div>
                            : null}

                        {childFiles.length > 0 ?
                            <div className="dashboard-cards-wrapper">
                                {childFiles.map(childFile => (
                                    <File key={childFile.id} file={childFile} />
                                ))}
                            </div>
                            : null}
                    </>

                    : <Loader loading={true} size={15}
                        css={{ position: "absolute", top: "50%", left: "calc(50% - 25px)" }} />
                }
            </Container>
        </>)
}
