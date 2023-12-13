import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { DarkModeProvider } from './components/DarkModeContext';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import store from './store/store';
import enTranslations from './languages/en.json';
import ruTranslations from './languages/ru.json';
import frTranslations from './languages/fr.json';
import esTranslations from './languages/es.json';
import deTranslations from './languages/de.json';
import uaTranslations from './languages/ua.json';
import ptTranslations from './languages/pt.json';
import uzTranslations from './languages/uz.json';

const persistedLanguage = localStorage.getItem('language');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      es: {
        translation: esTranslations,
      },
      de: {
        translation: deTranslations,
      },
      ua: {
        translation: uaTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
      uz: {
        translation: uzTranslations,
      }
    },
    lng: persistedLanguage || 'en', // Use persisted language or default to 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Listen for language changes and update local storage
i18n.on('languageChanged', (newLanguage) => {
  localStorage.setItem('language', newLanguage);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DarkModeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeProvider>
  </BrowserRouter>,
);
