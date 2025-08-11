import type { Item, Tab } from '../types';
import data from '../data.json' with { type: 'json' }
import { 
    useMemo,
    useState,
    useContext,
    useCallback,
    createContext,
} from 'react';



type Context = {
    tab: Tab
    extensions: Item[]
    onClick: (nameTab: Tab) => void
    updateExtension: (extensionName: string) => void
    removeExtension: (extensionName:  string) => void
}

type Props = {
    children: React.ReactNode
}

const ExtensionsContext = createContext<Context | null>(null)

export default function ExtensionProvider({ 
    children
}: Props){
    
    const [tab, setTab] = useState<Tab>("all")

    const [extensions, setExtensions] = useState<Item[]>(data)

    const onClick = useCallback((tab: Tab) => setTab(tab), [tab])

    const filterExtensions = (): Item[] => 
        extensions.filter(extension => {
            if(tab === "all")
                return true
            else if(tab === 'active')
                return extension.isActive
            else if(tab === 'inactive')
                return !extension.isActive
        })
 
    const removeExtension = (extension: string): void =>
        setExtensions(extensions.filter(({ name }) => name !== extension))
    
    const updateExtension = (extensionName: string): void =>
        setExtensions(
            extensions.map(
                extension => 
                    extensionName === extension.name 
                        ? {...extension, isActive: !extension.isActive}
                        : extension
        ))

    const visibleExtensions = useMemo(
        () => filterExtensions()
    , [extensions, tab])

    return(
        <ExtensionsContext.Provider value={{
            tab,
            onClick,
            updateExtension,
            extensions: visibleExtensions,
            removeExtension,
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