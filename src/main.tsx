
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App';
import ErrorPage from './pages/error/error-page';
import HomeScreen from './pages/home/home';
import TableScreen from './pages/home/tables/tables';
import LoginScreen from './pages/login/login';
import Unauthorized from './pages/unauthorized/unauthorized';


const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />
  },

  {
    path: "/erro",
    element: <ErrorPage />
  },
  {
    path: "/desautorizada",
    element: <Unauthorized />
  },
  {
    path: "/login",
    element: <LoginScreen />
  },
  {
    path: "/home",
    element: <HomeScreen />,
    children: [
      {
        path: '/home/mesas',
        element: <TableScreen />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
