import { Client } from "pg";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Class_detes } from '../Model/Class_dates'
import { CourseInterface } from './createCourseTable'
import { LecturerInterface } from './createLecturerTable'
import { SyllabusInterface } from './createSyllabusTable'
import { RoomInterface } from './createRoomTable'


type Class_detesSchemaModel = Model<Class_detes>

export interface Class_detesInterface {
    Schema: ModelStatic<Class_detesSchemaModel>
    insert: (class_detes: Omit<Class_detes, "id">) => Promise<Class_detes>
    searchById: (id: string) => Promise<Class_detes|undefined>

}


export async function createTable(sequelize: Sequelize, 
    Course: CourseInterface["Schema"], Lecturer: LecturerInterface["Schema"], 
    Syllabus: SyllabusInterface["Schema"], 
    Room: RoomInterface["Schema"]): Promise<Class_detesInterface> {

    const Class_detesSchema = sequelize.define<Class_detesSchemaModel>("Syllabus", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        start_hour: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_hour: {
            type: DataTypes.DATE,
            allowNull: false
        },
    } as any, {
        schema: "university_managment",
        createdAt: false,
    })

    
    //Course.hasMany(SyllabusSchema, { foreignKey: 'cuorse_id' });
    Class_detesSchema.belongsTo(Course, { foreignKey: 'course_id' });
    Class_detesSchema.belongsTo(Lecturer, { foreignKey: 'lecturer_id' });
    Class_detesSchema.belongsTo(Syllabus, { foreignKey: 'syllabus_id' });
    Class_detesSchema.belongsTo(Room, { foreignKey: 'room_id' });

    await Class_detesSchema.sync({ })
    return {
        Schema: Class_detesSchema,

        async insert(class_detes) {
            const result = await Class_detesSchema.create(class_detes as Class_detes)
            return result.toJSON();
        },
        
        async searchById(id: string) {
            const result = await Class_detesSchema.findByPk(id)
            return result?.toJSON();
        }
    };
}
