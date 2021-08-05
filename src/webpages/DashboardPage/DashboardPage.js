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

const circle1Radius = 150
const circle2Radius = 100

export default function DashboardPage() {

    const {folderId} = useParams()
    const {state = {}} = useLocation()
    const {folder, childFolders, childFiles, loaded} = useFolder(folderId, state.folder)

    return (
        <Container fluid className='mt-2 dashboard-container'>
            <div className="d-flex align-center px-1 top bg-transparent">
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

                                <div style={{
                                    top: '20%',
                                    right: '10%',
                                    height: 2 * circle2Radius,
                                    width: 2 * circle2Radius,
                                    background: "linear-gradient(to right top, #2193b0, #6dd5ed)"
                                }}
                                     className={'hero-circle'}/>
                                <div style={{
                                    left: '10%',
                                    bottom: '-30%',
                                    height: 2 * circle1Radius,
                                    width: 2 * circle1Radius,
                                    background: "linear-gradient(to right top, #cc2b5e, #753a88)"
                                }}
                                     className={'hero-circle'}/>
                                <div style={{
                                    top: '10%',
                                    left: "25%",
                                    height: 2 * circle2Radius,
                                    width: 2 * circle2Radius,
                                    background: "linear-gradient(to right top, #de6262, #ffb88c)"
                                }}
                                     className={'hero-circle'}/>
                                <div style={{
                                    bottom: 0,
                                    right: '30%',
                                    height: 2 * circle2Radius,
                                    width: 2 * circle2Radius,
                                    background: "linear-gradient(to right top, #56ab2f, #a8e063)"
                                }}
                                     className={'hero-circle'}/>

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
