import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database, storage } from '../../fbConfig'
import { ROOT_FOLDER } from '../../hooks/useFolder'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap';

export default function AddFileBtn({ currentFolder }) {
    const [uploadingFiles, setUploadingFiles] = useState([])

    function handleUpload(e) {

        for (let i = 0; i < e.target.files.length; i++) {

            const file = e.target.files[i] ? e.target.files[i] : null
            if (currentFolder === null || file === null) return

            const id = uuidV4()

            setUploadingFiles(previousUploadingFiles => [
                ...previousUploadingFiles,
                { id, name: file.name, progress: 0, error: false }
            ])

            const filePath = currentFolder === ROOT_FOLDER ?
                `${currentFolder.path.join('/')}/${file.name}` :
                `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

            const uploadTask = storage
                .ref(`/files/${filePath}`)
                .put(file)

            uploadTask.on('state_changed', snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                setUploadingFiles(previousUploadingFiles => {
                    return previousUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, progress }
                        }
                        return uploadFile
                    })
                })
            }, () => {
                setUploadingFiles(previousUploadingFiles => {
                    return previousUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, error: true }
                        }
                        return uploadFile
                    })
                })

            }, () => {
                setUploadingFiles(previousUploadingFiles => {
                    return previousUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id
                    })
                })

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where('name', '==', file.name)
                        .where('folderId', '==', currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles[0]
                            if (existingFile) {
                                existingFile.ref.update({ url: url })
                            } else {
                                database.files.add({
                                    url,
                                    name: file.name,
                                    createdAt: database.timeStamp,
                                    folderId: currentFolder.id
                                })
                            }
                        })

                })
            })
        }
    }

    return (
        <>
            <label className='btn btn-transparent text-primary ms-3 mt-1 p-0'>
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: '0', position: 'absolute', left: '-10000px' }}
                    multiple
                />
            </label>
            {
                uploadingFiles.length > 0 &&
                ReactDom.createPortal(
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            maxWidth: '250px'
                        }}
                    >
                        {
                            uploadingFiles.map(file => (
                                <Toast key={file.id}
                                    onClose={() => {
                                        setUploadingFiles(previousUploadingFiles => {
                                            return previousUploadingFiles.filter(uploadFile => {
                                                return uploadFile.id !== file.id
                                            })
                                        })
                                    }}
                                >
                                    <Toast.Header closeButton={file.error} className='text-truncate w-100 d-block'>
                                        {file.name}
                                    </Toast.Header>
                                    <Toast.Body>
                                        <ProgressBar
                                            animated={!file.error}
                                            variant={file.error ? 'danger' : 'primary'}
                                            now={file.error ? 100 : file.progress * 100}
                                            label={
                                                file.error ? 'Error' : `${Math.round(file.progress * 100)}%`
                                            }
                                        />
                                    </Toast.Body>
                                </Toast>
                            ))
                        }
                    </div>, document.body
                )
            }
        </>
    )
}
