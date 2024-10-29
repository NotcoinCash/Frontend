import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Tasks from './pages/task/Tasks.tsx'
import Friends from './pages/friends/Friends.tsx'
import Boost from './pages/boost/Boost.tsx'
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/tasks',
        element: <Tasks />,
    }, 
    {
        path: '/friends',
        element: <Friends />,
    }, 
    {
        path: '/boosts',
        element: <Boost />,
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
