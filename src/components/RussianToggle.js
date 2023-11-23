import { useEffect } from "react";
import { useLanguageRussian } from "./LanguageRussianContext";

const RussianToggle = () => {
    const { isRussian, toggleRussian } = useLanguageRussian();

    useEffect(() => {
        if (isRussian) {
            document.body.classList.add("russian");
        }
        else {
            document.body.classList.remove("russian");
        }
        localStorage.setItem("russian", isRussian ? "enabled" : "disabled");
    }, [isRussian]);

    return (

        <div className="toggle-switch">
            <div className='button r' id="button-1">
                <input
                    type="checkbox"
                    className="checkbox"
                    aria-label="toggle"
                    checked={isRussian}
                    onChange={toggleRussian}
                />
                <div className="knobs language "></div>
                <div className="layer"></div>
            </div>
        </div>
    );
}

export default RussianToggle;