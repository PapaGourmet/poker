
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import ErrorPage from './pages/error/error-page';
import HomeScreen from './pages/home/home';
import TableScreen from './pages/home/tables/tables';
import LoginScreen from './pages/login/login';
import Unauthorized from './pages/unauthorized/unauthorized';
import GameScreen from './pages/game/game';


const queryClient = new QueryClient()
const router = createBrowserRouter([

  {
    path: "/game",
    element: <GameScreen />
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
    path: "/",
    errorElement: <ErrorPage />,
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
