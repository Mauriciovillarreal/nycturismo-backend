const seedDB = require('./utils/seed')
const connectDB = require('./config/database')

const runSeed = async () => {
  await connectDB()
  await seedDB()
  process.exit()
}

runSeed()