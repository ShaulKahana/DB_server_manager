import { Client } from "pg";
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Room } from '../Model/Room'


type RoomSchemaModel = Model<Room>

export interface RoomInterface {
    Schema: ModelStatic<RoomSchemaModel>
    insert: (room: Omit<Room, "id">) => Promise<Room>
    searchById: (id: string) => Promise<Room|undefined>

}


export async function createTable(sequelize: Sequelize): Promise<RoomInterface> {
    const RoomSchema = sequelize.define<RoomSchemaModel>("Room", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
    }, {
        schema: "university_managment",
        createdAt: false,
    })
    
    await RoomSchema.sync({ })

    return {
        Schema: RoomSchema,

        async insert(room) {
            const result = await RoomSchema.create(room as Room)
            return result.toJSON();
        },
        
        async searchById(id: string) {
            const result = await RoomSchema.findByPk(id)
            return result?.toJSON();
        }
    };
}
