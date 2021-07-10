import React from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Folder({folder}) {
  return (
   <Button variant='outline-dark' as={Link} to={`/folders/${folder.id}`} style={{maxWidth: '250px'}}>
       <i className="fas fa-folder"/>
        <span className='mx-2' >{folder.name}</span>
          
  </Button>
  )
}
