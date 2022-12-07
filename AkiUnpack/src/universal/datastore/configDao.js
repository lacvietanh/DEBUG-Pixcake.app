import { CONFIG_TABLE } from '@/universal/types/config'
import DBIpcRender from '@/irender/DBIpcRender'

const table = CONFIG_TABLE


export async function findAll() {
    return await DBIpcRender.findGroupByExpression(table)
}
