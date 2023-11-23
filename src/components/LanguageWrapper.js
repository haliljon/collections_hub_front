import React from "react";
import { useLanguageRussian } from "./LanguageRussianContext";

const withLanguage = (WrappedComponent) => {
    return (props) => {
        const { isRussian } = useLanguageRussian();
        return <WrappedComponent {...props} isRussian={isRussian} />;
    };
};

export default withLanguage;