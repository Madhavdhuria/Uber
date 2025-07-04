const http = require("http");
const app = require("./app"); 
const {initialiseSocket}=require("./socket");

const server = http.createServer(app);

initialiseSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server with Socket.IO running at port ${PORT}`);
});
