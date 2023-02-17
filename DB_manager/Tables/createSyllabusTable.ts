import { Client } from "pg";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Syllabus } from '../Model/Syllabus'
import { CourseInterface } from './createCourseTable'

type SyllabusSchemaModel = Model<Syllabus>

export interface SyllabusInterface {
    Schema: ModelStatic<SyllabusSchemaModel>
    insert: (syllabus: Omit<Syllabus, "id">) => Promise<Syllabus>
    searchById: (id: string) => Promise<Syllabus|undefined>

}


export async function createTable(sequelize: Sequelize, Course: CourseInterface["Schema"]): Promise<SyllabusInterface> {
    const SyllabusSchema = sequelize.define<SyllabusSchemaModel>("Syllabus", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        references: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
    } as any, {
        schema: "university_managment",
        createdAt: false,
    })

    
    //Course.hasMany(SyllabusSchema, { foreignKey: 'cuorse_id' });
    SyllabusSchema.belongsTo(Course, { foreignKey: 'Course_id' });


    await SyllabusSchema.sync({ })
    return {
        Schema: SyllabusSchema,

        async insert(syllabus) {
            const result = await SyllabusSchema.create(syllabus as Syllabus)
            return result.toJSON();
        },
        
        async searchById(id: string) {
            const result = await SyllabusSchema.findByPk(id)
            return result?.toJSON();
        }
    };
}
