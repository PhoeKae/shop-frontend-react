import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import MenuPage from './components/MenuPage/MenuPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OurProcess from './components/OurProcess/OurProcess'
import ContactUs from './components/ContactUs/ContactUs'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Categories from './components/Categories'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/menu-page',
          element: <MenuPage />
        },
        {
          path: '/process',
          element: <OurProcess />
        },
        {
          path: '/contact',
          element: <ContactUs />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/categories',
          element: <Categories />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
