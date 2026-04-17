const { createClient } = require('bedrock-protocol')

function startBot() {
  const client = createClient({
    host: process.env.HOST,
    port: 19132,
    username: process.env.USERNAME || 'AFK_Bot'
  })

  client.on('join', () => {
    console.log('✅ Bot joined server')
  })

  client.on('spawn', () => {
    console.log('🎮 Spawned')
  })

  client.on('disconnect', () => {
    console.log('❌ Disconnected, retrying...')
    setTimeout(startBot, 5000)
  })

  client.on('error', (err) => {
    console.log('⚠️ Error:', err.message)
  })

  // Anti-AFK
  setInterval(() => {
    try {
      client.queue('player_action', { action: 0 })
    } catch {}
  }, 10000)
}

startBot()
