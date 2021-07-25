import { useEffect, useReducer } from "react";
import { database } from '../fbConfig'

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
    SET_CHILD_FILES: 'set-child-files'
}

export const ROOT_FOLDER = {
    name: 'Dashboard',
    id: null,
    path: []
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: [],
                loaded: false
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
                loaded: true
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folder, folderId])

    useEffect(() => {
        if (folderId === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER }
            })
        }
        database.folders
            .doc(folderId)
            .get()
            .then(doc => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER, payload: { folder: database.formatDoc(doc) }
                })
            })
            .catch(() => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER }
                })
            })

    }, [folderId])

    useEffect(() => {
        return database.folders
            .where('parentId', '==', folderId)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: { childFolders: snapshot.docs.map(database.formatDoc) }
                })
            })
    }, [folderId])

    useEffect(() => {
        return database.files
            .where('folderId', '==', folderId)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FILES,
                    payload: { childFiles: snapshot.docs.map(database.formatDoc) }
                })
            })

    }, [folderId])
    return state
}