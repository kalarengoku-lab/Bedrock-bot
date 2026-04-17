const { createClient } = require('bedrock-protocol')

console.log("Bot starting...")

if (!process.env.HOST) {
  console.log("❌ HOST not set in environment variables")
  process.exit(1)
}

function startBot() {
  const client = createClient({
    host: process.env.HOST,
    port: 19132,
    username: process.env.USERNAME || 'AFK_Bot'
  })

  client.on('connect', () => console.log("Connecting..."))

  client.on('join', () => console.log("✅ Joined server"))

  client.on('spawn', () => console.log("🎮 Spawned"))

  client.on('disconnect', () => {
    console.log("❌ Disconnected → retrying")
    setTimeout(startBot, 5000)
  })

  client.on('error', (err) => {
    console.log("⚠️ Error:", err.message)
  })

  setInterval(() => {
    try {
      client.queue('player_action', { action: 0 })
    } catch {}
  }, 10000)
}

startBot()
