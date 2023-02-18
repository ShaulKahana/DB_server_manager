import express, { Response, Request } from "express"
import { DB } from "../../DB_manager/indexPostgres"

export function createRouter(db: DB) {
    const courseRouter = express.Router();

    courseRouter.get('/:courseId', async (req: Request, res: Response) => {
        const course = await db.CourseTable.searchById(req.params.courseId);
        res.json(course);
    })
      
    courseRouter.post("/:courseId/students", (req: Request, res: Response) => {
        res.send({
          courseId: req.params.courseId,
          studentId: req.body.studentId,
          onZoom: req.body.onZoom
        })
    })

    return courseRouter;
}
