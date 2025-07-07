import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    WebApp.ready()
    WebApp.expand()
    document.body.style.background = WebApp.themeParams.bg_color || '#ffffff'
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 pb-[15vh]">
      {children}
    </div>
  )
}