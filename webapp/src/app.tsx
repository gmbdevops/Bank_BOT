import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages'
import OfferPage from './pages/offer/[id]'
import WebApp from '@twa-dev/sdk'

function App() {
  useEffect(() => {
    WebApp.ready()        // Показываем Telegram UI
    WebApp.expand()       // Разворачиваем Web App
    console.log(WebApp.initDataUnsafe) // ← можно отдать на backend
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
    </BrowserRouter>
  ) 
}
export default App