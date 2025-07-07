import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'

export function useCustomLinks(): string[] {
  const [links, setLinks] = useState<string[]>([])

  useEffect(() => {
    const userId = WebApp.initDataUnsafe?.user?.id
    if (!userId) return

    fetch(`/api/links/${userId}`)
      .then(res => res.json())
      .then(data => setLinks(data.links || []))
      .catch(() => setLinks([]))
  }, [])

  return links
}