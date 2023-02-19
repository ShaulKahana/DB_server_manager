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

    studentRouter.delete('/:studentID', async(req, res) => {
        //chack input
        const success = await db.StudentTable.delete(req.params.studentID)
        if(success){
            res.status(200).json({status: "deleted"})
        }else{
            res.status(404).json({status: "not fund"})
        }
    })

    studentRouter.post("/", async(req, res) => {
        try {
             //chack input
            const result = req.body
            const student = await db.StudentTable.insert(result)
            res.status(201).json({status: "created", data:result})
            
        } catch (error) {
            res.status(400).json({status: "invalid input"})

        }
       
    })


    return studentRouter;
}