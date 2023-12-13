import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {i18n.language}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('ru')}>Русский</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('fr')}>Française</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('es')}>Español</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('de')}>Deutsch</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('ua')}>Українська</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('pt')}>Português</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageSwitcher;
