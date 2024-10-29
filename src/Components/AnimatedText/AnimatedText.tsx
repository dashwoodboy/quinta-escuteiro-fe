import React from "react";

interface AnimatedTextProps {
    text: string;
    activeAnimation?: boolean;
    inverse?:boolean
}

export default function AnimatedText({ text, activeAnimation = true, inverse = false}: AnimatedTextProps) {
    return (
        <div className={`overflow-hidden py-1 items-center w-full justify-center text-center  ${activeAnimation && (inverse? "animate-text-hide [animation-fill-mode:backwards]" : "animate-text-reveal [animation-fill-mode:backwards]") }`}>
            {text}
        </div>
    );
}
