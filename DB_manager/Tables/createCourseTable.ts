import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { Course as coursemodel } from "../Model/course";

type Course = Omit<coursemodel,"class_dates" | "syllabus">

type CourseSchemaModel = Model<Course>

export interface CourseInterface {
    Schema: ModelStatic<CourseSchemaModel>
    insert: (course: Omit<Course, "id">) => Promise<Course>
    searchById: (id: string) => Promise<Course|undefined>
}


export async function createTable(sequelize: Sequelize): Promise<CourseInterface> {
    const CourseSchema = sequelize.define<CourseSchemaModel>("Course", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        course_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        starting_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        minimum_pass_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maximum_students: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_ready: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        schema: "university_managment",
        createdAt: false
    });
    
    await CourseSchema.sync();
    return {
        Schema: CourseSchema,
        async insert(course) {
            const result = await CourseSchema.create(course as Course)
            return result.toJSON();
        },
        async searchById(id: string) {
            const result = await CourseSchema.findByPk(id)
            return result?.toJSON();
        }
    };
}



export type CourseTable = Awaited<ReturnType<typeof createTable>>;
