import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages'
import OfferPage from './pages/offer/[id]'
import WebApp from '@twa-dev/sdk'

declare global {
  interface Window {
    Telegram: any
  }
}

function App() {
  useEffect(() => {
  const WebApp = window.Telegram.WebApp

  const handleClick = () => {
    WebApp.sendData('user_data')
  }

  WebApp.ready()
  WebApp.expand()
  WebApp.MainButton.setText('📩 Отправить')
  WebApp.MainButton.onClick(handleClick)
  WebApp.MainButton.show()

  return () => {
    WebApp.MainButton.offClick(handleClick)
    WebApp.MainButton.hide()
  }
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