const app = require('./src/app.js');
const { saveDogsDB } = require('./src/controllers/DogController.js');
const { saveTemperamentsOnDB } = require('./src/controllers/TemperamentController.js')
const { conn } = require('./src/db.js');

// sincronizando app y db

app.listen(3001, async() => {
  try {
    await conn.sync({ force:false })
    console.log('Server on port 3001')
  } catch (error) {
  console.log(error.message)
  }
})
