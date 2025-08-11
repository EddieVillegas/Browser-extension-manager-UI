import { createContext, useState, useContext } from "react";

type Props = {
    children: React.ReactNode
}

type Context = {
    isDark: boolean
    toggleDark: () => void
}

export const ThemeContext = createContext<Context|null>(null)

export default function ThemeProvider({ children }: Props){
    const [isDark, setDark] = useState<boolean>(false);
    const toggleDark = () => setDark(prevState => !prevState)
    return(
        <ThemeContext.Provider value={{
            isDark,
            toggleDark
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if(!context) throw new Error('useContext needs DarkModeProvider')
    const {isDark, toggleDark} = context
    return {
        isDark, toggleDark
    }
}