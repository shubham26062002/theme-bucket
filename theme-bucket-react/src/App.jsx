import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProfileLayout from './layouts/ProfileLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/profile/:id" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App