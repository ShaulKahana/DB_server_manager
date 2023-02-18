import { createTables} from "./createTables";


export async function main() {
    const DB = await createTables();
    return DB;
}

export type DB = Awaited<ReturnType<typeof main>>

