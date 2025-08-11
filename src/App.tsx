import logo from './assets/images/logo.svg'
import Toggle from './components/Icon/Icon'
import Card from './components/Card/Card'
import Logo from './components/Logo/Logo'
import FilterTab from './components/Filter/Filter'
import { useTheme } from './context/useTheme'
import type { Item } from './types'
import { useExtensions } from './context/useExtensions'
import clsx from 'clsx'

export default function App() {

  const { isDark, toggleDark } = useTheme()

  const {extensions, onClick, tab} = useExtensions()

  const makeCard = (item: Item) => <Card item={item} key={item.name} isDark={isDark} />

  const classH1 = clsx(
    "text-4xl",
    "font-bold",
    "capitalize", 
    "text-center",
    "font-noto",
    isDark ? "text-neutral-50" : "text-neutral-900"
  )

  return (
    <main className={`md:w-3/5 mx-auto p-5 ${isDark ? "bg-[linear-gradient(180deg,#04091B_0%,#091540_100%)]" : "bg-[linear-gradient(180deg,#EBF2FC_0%,#EEFBF9_100%)]"}`}>
      <div className={`flex row justify-between p-3 rounded-2xl ${isDark ? "bg-neutral-800" : "bg-neutral-50"} shadow mb-8`}>
        <Logo img={logo} />
        <Toggle darkMode={isDark} onClick={toggleDark}/>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
        <h1 className={classH1}>
          extensions list
        </h1>
        <FilterTab onClick={onClick} tab={tab} />
      </div>
      <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {extensions.map(makeCard)}
      </div>
    </main>
  )
}
