import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Task from './pages/task/Task.tsx'
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
        element: <Task />,
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
