import 'telegraf'
import { SessionFlavor } from 'telegraf'

declare module 'telegraf' {
  interface Session {
    category?: 'ua' | 'world' | 'crypto'
  }

  interface Context extends SessionFlavor<Session> {}
}