import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
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
import BecomeASeller from './pages/BecomeASeller'
import Sales from './pages/Sales'
import AppLayout from './layouts/AppLayout'
import { loader as appLayoutloader } from './layouts/AppLayout'
import AuthRequiredLayout from './layouts/AuthRequiredLayout'
import { loader as profileLayoutLoader } from './layouts/ProfileLayout'
import { loader as authRequireadLayoutLoader } from './layouts/AuthRequiredLayout'
import { loader as CategoriesLoader } from './layouts/RootLayout'
import { loader as salesLoader } from './pages/Sales'

// const App = () => {
//   return (
//     <BrowserRouter>
//       <SessionProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<RootLayout />}>
//             <Route index element={<Home />} />
//             <Route path="categories" element={<CategoriesLayout />} >
//               <Route index element={<Categories />} />
//               <Route path=":id/products" element={<CategoryProducts />} />
//             </Route>
//             <Route path="categories/:categoryId/products/:productId" element={<Product />} />
//             <Route path="/profile/:id" element={<ProfileLayout />}>
//               <Route index element={<Profile />} />
//               <Route path="purchases" element={<Purchases />} />
//               <Route path="wishlist" element={<Wishlist />} />
//               <Route path="become-a-seller" element={<BecomeASeller />} />
//               <Route path="sales" element={<Sales />} />
//             </Route>
//           </Route>
//         </Routes>
//       </SessionProvider>
//     </BrowserRouter >
//   )
// }

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<AppLayout />} loader={appLayoutloader}>
    <Route path="/" element={<RootLayout />} loader={CategoriesLoader}>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<CategoriesLayout />}>
        <Route index element={<Categories />} />
        <Route path="/categories/:id/products" element={<CategoryProducts />} />
        </Route>
      <Route path="/categories/:categoryId/products/:productId" element={<Product />} />
      <Route path="/profile/:id" element={<AuthRequiredLayout />} loader={authRequireadLayoutLoader}>
        <Route path="/profile/:id" element={<ProfileLayout />} loader={profileLayoutLoader}>
          <Route index element={<Profile />} />
          <Route path="/profile/:id/become-a-seller" element={<BecomeASeller />} />
          <Route path="/profile/:id/sales" element={<Sales />} loader={salesLoader} />
        </Route>
      </Route>
    </Route>
    <Route path="/login" element={<Login />} />
  </Route>
))

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App