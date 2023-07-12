import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileLayout from './layouts/ProfileLayout'
import { SessionProvider } from './hooks/useSession'
import CategoriesLayout from './layouts/CategoriesLayout'
import CategoryProducts from './pages/CategoryProducts'
import Product from './pages/Product'
import Purchases from './pages/Purchases'

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoriesLayout />} >
              <Route index element={<Categories />} />
              <Route path=":id/products" element={<CategoryProducts />} />
              <Route path=":categoryId/products/:productId" element={<Product />} />
            </Route>
            <Route path="/profile/:id" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="purchases" element={<Purchases />} />
            </Route>
          </Route>
        </Routes>
      </SessionProvider>
    </BrowserRouter >
  )
}

export default App