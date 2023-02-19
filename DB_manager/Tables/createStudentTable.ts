import { Client } from "pg";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Student } from '../Model/Student'


type StudentSchemaModel = Model<Student>

export interface StudentInterface {
    Schema: ModelStatic<StudentSchemaModel>
    insert: (student: Omit<Student, "id">) => Promise<Student>
    searchById: (id: string) => Promise<Student|undefined>
    delete:(Studentid: string) => Promise<boolean>

}


export async function createTable(sequelize: Sequelize): Promise<StudentInterface> {
    const StudentSchema = sequelize.define<StudentSchemaModel>("Student", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        schema: "university_managment",
        createdAt: false,
    })
    
    await StudentSchema.sync({ })

    return {
        Schema: StudentSchema,

        async insert(student) {
            const result = await StudentSchema.create(student as Student)
            return result.toJSON();
        },
        
        async searchById(id: string) {
            const result = await StudentSchema.findByPk(id)
            return result?.toJSON();
        },

        async delete(Studentid: string){
            const result = await StudentSchema.destroy({where:{id:Studentid}})
            return result === 1;
        },
    };
}
