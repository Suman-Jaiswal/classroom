import React from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {ROOT_FOLDER} from '../../hooks/useFolder'
import {Link} from 'react-router-dom'

export default function FolderBreadcrumbs({currentFolder}) {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) path = [...path, ...currentFolder.path]
    return (
        <Breadcrumb
            className='mt-auto mb-auto p-1 flex-grow-1'
            listProps={{className: 'p-0 m-0'}}
        >
            {
                path.map((folder, index) => (
                    <Breadcrumb.Item
                        key={folder.id}
                        linkAs={Link}
                        linkProps={{
                            to: {
                                pathname: folder.id ? `/folders/${folder.id}` : '/dashboard',
                                state: {folder: {...folder, path: path.slice(1, index)}}
                            }
                        }}
                        className='text-truncate d-inline-block'
                        style={{maxWidth: '150px', textDecoration : "none"}}
                    >
                        {folder.name}
                    </Breadcrumb.Item>
                ))
            }
            {currentFolder && (
                <Breadcrumb.Item
                    className='text-truncate d-inline-block'
                    style={{maxWidth: '200px', color: "grey", fontSize: "18px"}}
                    active>
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}

