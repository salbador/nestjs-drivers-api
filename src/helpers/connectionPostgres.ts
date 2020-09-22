import {createConnection, getConnectionManager, getConnection} from 'typeorm';


const manager = getConnectionManager().get('your_orm_name');
// const repository = manager.getRepository<AModel>(Model);

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;
