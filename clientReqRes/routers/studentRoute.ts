import express from "express"
import { DB } from "../../DB_manager/indexPostgres"

export function createRouter(db: DB) {
    const studentRouter = express.Router({});

    studentRouter.get('/:studentId', async(req, res) => {
        const student = await db.StudentTable.searchById(req.params.studentId);
        if(!student) {
            res.status(404).json({status: "Not Found"})
        }
        res.json(student)
    })
    return studentRouter;
}