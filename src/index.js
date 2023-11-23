import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DarkModeProvider } from './components/DarkModeContext';
import { LanguaugeRussianProvider } from './components/LanguageRussianContext';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DarkModeProvider>
      <LanguaugeRussianProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LanguaugeRussianProvider>
    </DarkModeProvider>
  </BrowserRouter>,

);
