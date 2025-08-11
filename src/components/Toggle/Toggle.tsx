import clsx from "clsx"

type Props = {
    isDark: boolean
    isActive: boolean
    update: () => void
}

export default function Toggle({ 
    isDark,
    update,
    isActive,
}: Props) {

    const classNameDiv = clsx(
        "h-6",
        "w-11",
        "relative",
        "ease-in-out",
        "rounded-full",
        "focus:ring-2",
        "duration-300",
        "transition-all",
        "focus:ring-blue-500",
        isDark ? "bg-neutral-600" : "bg-neutral-300",
        isActive ? "bg-red-700" : "bg-neutral-300",
        isDark ? "checked:bg-red-400":"checked:bg-neutral-700"
    ) 

    const classSpan = clsx(
        "w-4",
        "h-4",
        "top-1",
        "left-1",
        "absolute",
        "bg-white", 
        "ease-in-out",
        "rounded-full",
        "duration-300",
        "transition-transform",
        isActive && "translate-x-5"
    )

    return(
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isActive}
                className="sr-only peer"
                onChange={() => update()}
            />
            <div className={classNameDiv}>
                <span className={classSpan}></span>
            </div>
        </label>
    )
}