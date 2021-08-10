const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')

app.use(require('cors')())
app.use(express.static('public'))

app.use('/api', route)
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})