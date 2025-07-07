const userLinks = new Map<number, string[]>()

export function saveLinksForUser(userId: number, links: string[]) {
  userLinks.set(userId, links)
}

export function getLinksForUser(userId: number): string[] | undefined {
  return userLinks.get(userId)
}