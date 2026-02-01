import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './lib/authContext';
import { AlertsProvider } from './lib/alertsContext';

function App() {
  return (
    <AuthProvider>
      <AlertsProvider>
        <RouterProvider router={router} />
      </AlertsProvider>
    </AuthProvider>
  );
}

export default App;