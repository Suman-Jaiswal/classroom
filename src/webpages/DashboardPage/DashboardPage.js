import React from 'react'
import './DashboardPage.scss'
import firstYearImage from './yearImages/first.svg'
import secondYearImage from './yearImages/second.svg'
import thirdYearImage from './yearImages/third.svg'
import fourthYearImage from './yearImages/fourth.svg'

export default function DashboardPage() {

    return (
        // <>
        //     <Container fluid className='mt-2'>
        //         <div className="d-flex align-center">
        //             <FolderBreadcrumbs currentFolder={folder}/>
        //         </div>
        //         <div className="content-count">
        //             Folders: {childFolders.length}, Files: {childFiles.length}
        //         </div>
        //         <hr/>
        //         {
        //             childFolders.length > 0 && (
        //                 <div className="d-flex flex-wrap">
        //                     {childFolders.map(childFolder => (
        //                         <div className='p-2' key={childFolder.id}>
        //                             <Folder folder={childFolder}/>
        //                         </div>
        //                     ))}
        //                 </div>
        //             )
        //         }
        //         {childFiles.length > 0 && childFolders.length > 0 && <hr/>}
        //         {
        //             childFiles.length > 0 && (
        //                 <div className="d-flex flex-wrap">
        //                     {childFiles.map(childFile => (
        //                         <div className='p-2' key={childFile.id}>
        //                             <File file={childFile}/>
        //                         </div>
        //                     ))}
        //                 </div>
        //             )
        //         }
        //     </Container>
        // </>
        <div className={'dashboard-return-wrapper'}>
            <h1 className={'dashboard-title'}>Welcome to IITI Classroom</h1>
            <div className={'dashboard-subject-cards'}>
                <div className={'year-card'} >
                    <img src={firstYearImage}/>
                    <h3>first year</h3>
                </div>
                <div className={'year-card'} >
                    <img src={secondYearImage}/>
                    <h3>second year</h3>
                </div>
                <div className={'year-card'} >
                    <img src={thirdYearImage}/>
                    <h3>third year</h3>
                </div>
                <div className={'year-card'} >
                    <img src={fourthYearImage}/>
                    <h3>fourth year</h3>
                </div>
            </div>
        </div>
    )
}
