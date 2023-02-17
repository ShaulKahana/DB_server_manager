import { Client } from "pg";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Lecturer } from '../Model/Lecturer'


type LecturerSchemaModel = Model<Lecturer>

export interface LecturerInterface {
    Schema: ModelStatic<LecturerSchemaModel>
    insert: (lecturer: Omit<Lecturer, "id">) => Promise<Lecturer>
    searchById: (id: string) => Promise<Lecturer|undefined>

}


export async function createTable(sequelize: Sequelize): Promise<LecturerInterface> {
    const LecturerSchema = sequelize.define<LecturerSchemaModel>("Lecturer", {
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
    
    await LecturerSchema.sync({ })
    return {
        Schema: LecturerSchema,

        async insert(lecturer) {
            const result = await LecturerSchema.create(lecturer as Lecturer)
            return result.toJSON();
        },
        
        async searchById(id: string) {
            const result = await LecturerSchema.findByPk(id)
            return result?.toJSON();
        }
    };
}
