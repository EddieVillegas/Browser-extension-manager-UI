import clsx from "clsx";
import { useTheme } from "../../context/useTheme"

import React from "react";

type Props = {
    isActive?: boolean,
    onClick: () => void,
    children: React.ReactNode
}

export default function Button({ 
    onClick,
    children,
    isActive, 
}: Props) {
    
    const  { isDark } = useTheme()

    const buttonClass = clsx(
        "px-5",
        "pb-3",
        "pt-2",
        "border-1",
        "outline-0",
        "capitalize",
        "rounded-3xl",
        "cursor-pointer",
        isActive && "bg-red-700",
        isDark ? "bg-neutral-700" :"bg-neutral-50", 
        isDark ? "text-neutral-50" : "text-neutral-900",
        isDark ? "hover:bg-red-700" : "hover:bg-red-500",
        isDark ? "border-neutral-700" : "border-neutral-200",
        isDark ? "hover:text-neutral-50" : "900",
    )

    return (
        <button
            className={buttonClass}
            onClick={() => onClick()}
        >
            {children}
        </button >
    )
}