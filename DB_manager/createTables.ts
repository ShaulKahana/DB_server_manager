import { Model, Sequelize, DataTypes } from "sequelize";
import { createTable as createClassDatesTable } from "./Tables/createClassDatesTable";
import { createTable as createCourseStudentsTable } from "./Tables/createCourseStudentsTable";
import { createTable as createCourseTable } from "./Tables/createCourseTable";
import { createTable as createLecturerTable } from "./Tables/createLecturerTable";
import { createTable as createRoomTable } from "./Tables/createRoomTable";
import { createTable as createStudentTable } from "./Tables/createStudentTable";
import { createTable as createSyllabusTable } from "./Tables/createSyllabusTable";




export function getConnection() {
    const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        database: "university_managment_DB",
        username: 'postgres',
        password: 'atukfvbt10',
    })
    return sequelize;
} 

export async function createTables(sequelize: Sequelize = getConnection()) {

    const StudentTable = await createStudentTable(sequelize);
    const CourseTable = await createCourseTable(sequelize);
    const studentCourseTable = await createCourseStudentsTable(sequelize, CourseTable.Schema, StudentTable.Schema);
    const LecturerTable = await createLecturerTable(sequelize);
    const RoomTable = await createRoomTable(sequelize);
    const SyllabusTable = await createSyllabusTable(sequelize, CourseTable.Schema);
    const ClassDatesTable = await createClassDatesTable(sequelize, CourseTable.Schema, LecturerTable.Schema, SyllabusTable.Schema,RoomTable.Schema);

    return {
        StudentTable,
        CourseTable,
        studentCourseTable,
        LecturerTable,
        RoomTable,
        SyllabusTable,
        ClassDatesTable
    }
}