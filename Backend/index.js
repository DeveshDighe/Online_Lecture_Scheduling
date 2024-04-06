const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const allRoutes = require('./Src/Routes/index.js')

const app = express();

const PORT = 8000

dotenv.config();
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hi re baba')
})

app.use('/api/v1', allRoutes)


app.listen(PORT,()=>{
  console.log(`Running on port ${PORT}`);
} )

mongoose.connect(process.env.DATABASE_KEY).then(()=>{
  console.log('Database Connected');
})
.catch((err)=>{
  console.log(err, 'err');
})