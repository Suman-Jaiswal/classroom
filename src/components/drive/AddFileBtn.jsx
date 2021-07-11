import React from 'react'
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {storage, database} from '../../fbConfig'
import {ROOT_FOLDER} from '../../hooks/useFolder'

export default function AddFileBtn({currentFolder}) {
    function handleUpload(e){
        const file = e.target.files[0]
        if(currentFolder===null || file===null ) return

        const filePath = currentFolder === ROOT_FOLDER ?
        `${currentFolder.path.join('/')}/${file.name}` :
        `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

        const uploadTask = storage
        .ref(`/files/${filePath}`)
        .put(file)

        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              database.files.add({
                  url,
                  name: file.name,
                  createdAt: database.timeStamp,
                  folderId: currentFolder.id
              })
            })
        })

    }
    return (
        <label className='btn btn-outline-primary m-2 mr-5' >
            <FontAwesomeIcon icon={faFileUpload} />
            <input 
            type="file" 
            onChange={handleUpload}
            style={{opacity:'0', position: 'absolute', left:'-10000px'}} />
        </label>
    )
}
