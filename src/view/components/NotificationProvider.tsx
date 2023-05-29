import { Toaster } from 'react-hot-toast';

const Notification: React.FC = () => (
    <Toaster 
          toastOptions={{
            error: {
              iconTheme: {
                primary: 'red',
                secondary: 'var(--foreground)',
              },
            },
            style: {
              border: 'var(--edge)',
              color: 'var(--text)',
              background: 'var(--foreground)',
            }
          }}
          position="top-right"
          reverseOrder={false}
      />
);
export default Notification;