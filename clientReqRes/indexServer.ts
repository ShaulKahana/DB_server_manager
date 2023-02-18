import express from "express"
import {createRouter as createStudentRoute } from "./routers/studentRoute"
import { createRouter as  createCoursRoute} from "./routers/courseRoute"
import { main as initDB } from "../DB_manager/indexPostgres"


export async function main() {
  const app = express()

  const db = await initDB()
  app.use(express.json({ limit: "10kb" }))
  app.use("/student", createStudentRoute(db));
  app.use("/course", createCoursRoute(db))
  
  app.listen(8088, () => {
    console.log(`Example app listening on port 8088`)
  })
}


