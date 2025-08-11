import iconMoon from '../../assets/images/icon-moon.svg'
import iconSun from '../../assets/images/icon-sun.svg'

type Props = {
    darkMode: boolean
    onClick: () => void
}

export default function Toggle({ darkMode, onClick }: Props) {
    return (
        <button className={`cursor-pointer bg-neutral-${darkMode ? "700" : "50"} rounded-xl p-3`} onClick={onClick}>
          <img src={darkMode ? iconSun : iconMoon } alt="icon toggle" />
        </button>
    )
}