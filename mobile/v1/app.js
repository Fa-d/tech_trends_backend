import express from 'express'
const app = express()
const port = 3000

app.get('/getTitles', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, "192.168.1.104" ,() => {
  console.log(`Example app listening on port ${port}`)
})



