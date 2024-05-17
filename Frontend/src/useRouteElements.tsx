import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Intro from './features/intro'
import Playlists from './features/playlists'
import MainLayout from './layouts/mainLayout'
import Search from './features/search'
import Home from './features/home'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/intro' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/playlists' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/intro',
          element: <Intro />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/playlists/:id',
          element: (
            <MainLayout>
              <Playlists />
            </MainLayout>
          )
        },
        {
          path: '/search',
          element: (
            <MainLayout>
              <Search />
            </MainLayout>
          )
        },
        {
          path: '/home',
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
