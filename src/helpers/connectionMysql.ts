import {createConnection, getConnectionManager, getConnection} from 'typeorm';
import { Post } from './../../src/post/entities';

const manager = getConnectionManager().get('20-domini-code');
const repository = manager.getRepository<Post>(Post);

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
      await repository.query(`DROP TABLE ${entity.tableName}`);
    });
  },
};
export default connection;
