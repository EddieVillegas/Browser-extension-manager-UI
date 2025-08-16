import type { Item, Tab } from '../types';
import data from '../data.json' with { type: 'json' }
import { 
    useMemo,
    useReducer,
    useContext,
    createContext,
} from 'react';

type Context = {
    tab: Tab
    extensions: Item[],
    onClick: (nameTab: Tab) => void
    updateExtension: (extensionName: string) => void
    removeExtension: (extensionName:  string) => void
}

type Props = {
    children: React.ReactNode
}

type StateExtension = Pick<Context, "extensions" | "tab">

type SetFilter = {
    type: "FILTER",
    payload: Tab
}

type RemoveExtension = {
    type: "REMOVE",
    payload?: string
}

type ToggleExtension = {
    type: "UPDATE",
    payload?: string
}

type Actions = SetFilter | RemoveExtension | ToggleExtension

//State
const initialState: StateExtension = {
    tab: 'all',
    extensions: data,
}

// Reducer
const reducer = (
    state: StateExtension,
    action: Actions,
): StateExtension => {
    switch(action.type) {
        case "REMOVE": {
            const { payload } = action
            return {
                ...state,
                extensions: state.extensions.filter(({ name }) => name !== payload)
            }
        }
        case "UPDATE": {
            const { payload } = action
            return {
                ...state,
                extensions: state.extensions.map(
                    extension => payload !== extension.name ? extension : { ...extension, isActive: !extension.isActive }
                )
            }
        }
        case "FILTER": {
            const { payload: tab } = action
            return { ...state, tab }
        }
        default:
            return state
    }
}

//Actions
const filterAction = (tab: Tab): Actions => ({ type: "FILTER", payload: tab })

const updateAction = (extensionName: string): Actions => ({type: 'UPDATE', payload: extensionName})

const removeAction = (extensionName: string): Actions => ({type: 'REMOVE', payload: extensionName})

//Selectors
const selectFilter = ({ tab }: StateExtension) => tab

const selectExtension = ({ extensions }: StateExtension) => extensions

const selectFilteredExtension = (state:  StateExtension) => {
    const tab = selectFilter(state)
    const extensions = selectExtension(state)
    switch(tab) {
        case 'active': return extensions.filter(extension => extension.isActive)
        case 'inactive': return extensions.filter(extension => !extension.isActive)
        default: return extensions
    }
}

//Context
const ExtensionsContext = createContext<Context | null>(null)

export default function ExtensionProvider({ 
    children
}: Props){
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const filterExtensions = (tab: Tab) =>
        dispatch(filterAction(tab))

    const updateExtension = (extensionName: string) =>
        dispatch(updateAction(extensionName))
    
    const removeExtension = (extensionName: string) =>
        dispatch(removeAction(extensionName))

    return(
        <ExtensionsContext.Provider value={{
            tab: state.tab,
            updateExtension,
            removeExtension,
            onClick: filterExtensions,
            extensions: selectFilteredExtension(state),
        }}>
            {children}
        </ExtensionsContext.Provider>
    )
}

export function useExtensions() {
    const context = useContext(ExtensionsContext)
    if(!context) throw new Error('useContext needs DarkModeProvider')
    return context
}