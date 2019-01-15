import {
    GENERIC_ERROR,
    LOAD_FILES,
    LOAD_FILES_SUCCESS,
    LOAD_FILES_ERROR,
    PURCHASE,
    PURCHASE_SUCCESS,
    DOWNLOAD,
    DOWNLOAD_SUCCESS
} from '../lib/action-types'

const initialState = {
    error: null,
    loading: true,
    items: [],
    item: null,
    downloading: [],
    purchasing: []
}

export default function(state = initialState, action) {

    switch (action.type) {
        // GENERIC ERROR
        case GENERIC_ERROR:
            return { ...state, error: action.error}

        // LOAD FILES
        case LOAD_FILES:
            return { ...state, loading: true }
        case LOAD_FILES_SUCCESS:
            return { ...state, loading: false, ...action.data }
        case LOAD_FILES_ERROR:
            return { ...state, loading: false, error: "Could not load files" }

        // PURCHASE
        case PURCHASE:
            state.purchasing.push(action.id)
            return { ...state }
        case PURCHASE_SUCCESS:
            state.purchasing = state.purchasing.filter((x) => x != action.id)
            return { ...state }
        
        // DOWNLOAD
        case DOWNLOAD:
            state.downloading.push(action.id)
            return { ...state }
        case DOWNLOAD_SUCCESS:
            state.downloading = state.downloading.filter((x) => x != action.id)
            return { ...state }
        
        // DEFAULT
        default:
            return state;
    }
  };