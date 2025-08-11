import { useExtensions } from "../../context/useExtensions"
import Button from "../Button/Button"
import Toggle from "../Toggle/Toggle"
import type { Item } from '../../types';
import clsx from "clsx";

type Props = {
    item: Item
    isDark: boolean
}

export default function Card({ 
    item,
    isDark,
}: Props) {

    const { removeExtension, updateExtension } = useExtensions()

    const {logo, name, isActive ,description } = item

    const className = clsx(
        "mb-1",
        "text-xl",
        "font-noto-bold",
        isDark ? "text-neutral-50" : "text-neutral-900"
    )

    const classDescription = clsx(
        "text-sm",
        "font-noto",
        "text-base",
        isDark ? "text-neutral-50" : "text-neutral-600"
    )

    return(
        <div className={`bg-neutral-${isDark ? "800" :"50"} rounded-3xl p-3`}>
            <div className='flex gap-3 mb-10'>
                <img src={logo} alt={name} />
                <div>
                    <p className={className}>{name}</p>
                    <p className={classDescription}>{description}</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <Button
                    onClick={() => removeExtension(name)}
                >
                    <span className="text-base">
                        remove
                    </span>
                </Button>
                <Toggle 
                    isActive={isActive}
                    isDark={isDark}
                    update={() => updateExtension(name)}
                />
            </div>
        </div>
    )
}