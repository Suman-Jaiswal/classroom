import { Button } from 'react-bootstrap'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Folder({folder}) {
  return (

      <Button variant='transparent' className={'year-card'} as={Link} to={{pathname: `/folders/${folder.id}`, state: {folder}}}>
         <img src={`img/years/${folder.name}.svg`} alt={folder.name}/>
         <h3>{folder.name}</h3>
      </Button>
          
  )
}
