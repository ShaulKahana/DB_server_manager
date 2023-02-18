import { main  as initServer } from "./clientReqRes/indexServer"


initServer().then(() => {
  console.log("Exiting")
})