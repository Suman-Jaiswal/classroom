import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {database} from '../../fbConfig'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFolderBtn({currentFolder}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentFolder===null) return

    const path = [...currentFolder.path]
    if(currentFolder!== ROOT_FOLDER){
      path.push( {name: currentFolder.name, id: currentFolder.id} )
      console.log('pushed')
    }

     database.folders.add({
       name,
       parentId: currentFolder.id,
      //  userId,
       path,
       createdAt: database.timeStamp
     })
    setName('')
  }

  return (
    <>
      <Button onClick={openModal} variant='outline-success' size='sm' >
        <i className="fas fa-folder-plus"></i>
      </Button>
      <Modal show={open} onHide={closeModal} >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                Folder Name
              </Form.Label>
              <Form.Control
                type='text'
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal} type='submit'>
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}
