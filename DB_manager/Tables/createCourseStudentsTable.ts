import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { StudentCourse } from "../Model/studentCourse";
import { CourseInterface } from './createCourseTable'
import { StudentInterface } from "./createStudentTable";

type StudentSchemaModel = Model<StudentCourse>

export interface StudentCourseInterface {
  insert: (studentCourse: StudentCourse) => Promise<StudentCourse>
}

export async function createTable(sequelize: Sequelize, Course: CourseInterface["Schema"], Student: StudentInterface["Schema"]): Promise<StudentCourseInterface> {
  const StudentCourse = sequelize.define<StudentSchemaModel>('student_course', {
  } as StudentCourse, {
    schema: "students",
    createdAt: false,
  })
  Course.belongsToMany(Student, { through: StudentCourse })
  Student.belongsToMany(Course, { through: StudentCourse })
  await StudentCourse.sync({force: true })

  return {
    async insert(studentCourse) {
      const result = await StudentCourse.create(studentCourse)
      return result.toJSON();
    }
  }
}
