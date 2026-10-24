// Service worker: shows the daily workout reminder when the push server wakes it up,
// and focuses the app when the notification is tapped.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('push', (event) => {
  const ko = !(self.navigator.language || '').toLowerCase().startsWith('en')
  event.waitUntil(
    self.registration.showNotification(ko ? '오늘 운동 아직 안 했어요 💪' : "You haven't worked out today 💪", {
      body: ko ? '10분이면 충분해요. 지금 시작해볼까요?' : 'Ten minutes is enough. Ready to start?',
      icon: 'favicon.svg',
      tag: 'daily-workout-reminder',
      renotify: true,
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients[0]
      if (existing) return existing.focus()
      return self.clients.openWindow(self.registration.scope)
    }),
  )
})
