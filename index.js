const http = require("http")

const app = require("./app")

let port = process.env.PORT || 3001;

const server = http.createServer(app)
 
server.listen(port, () => {
  console.log(
    `Server Running on ${port}`
  )
})