const app = require('./src/app.js');
const { saveDogsDB } = require('./src/controllers/DogController.js');
const { saveTemperamentsOnDB } = require('./src/controllers/TemperamentController.js')
const { conn } = require('./src/db.js');

// sincronizando app y db

app.listen(3001, async() => {
  try {
    saveDogsDB();
    saveTemperamentsOnDB();
    await conn.sync({ force:true })
    console.log('Server on port 3001')
  } catch (error) {
  console.log(error.message)
  }
})
