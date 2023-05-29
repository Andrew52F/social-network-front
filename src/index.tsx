import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import ThemeProvider from './hooks/useTheme';
import { setupStore } from './store';
import './index.css';
import App from './view/App';
import { BrowserRouter } from 'react-router-dom';
import NotificationProvider from './view/components/NotificationProvider'
import LocalizationProvider from './localization';
import SocketApiProvider from './hooks/useSocket';
import initSocket from './websocket';



const store = setupStore();
// const { profile: { id }} = store.getState()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ThemeProvider>
        <StoreProvider store={store}>
            <LocalizationProvider>
              <BrowserRouter>
                    <NotificationProvider />
                    <App />
              </BrowserRouter>
            </LocalizationProvider>
        </StoreProvider>
    </ThemeProvider>
  // </React.StrictMode>
);

