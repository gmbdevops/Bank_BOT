import express from 'express'
import dotenv from 'dotenv'
import { getLinksForUser } from './memory-store'

dotenv.config()

const app = express()
app.use(express.json())

// 🔽 Новый маршрут: отдать ссылки по userId
app.get('/api/links/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  if (isNaN(userId)) {
    return res.status(400).json({ ok: false, message: 'Invalid userId' })
  }

  const links = getLinksForUser(userId) || []
  res.json({ ok: true, links })
})

app.listen(3000, () => {
  console.log('🟢 Backend API работает: http://localhost:3000')
})