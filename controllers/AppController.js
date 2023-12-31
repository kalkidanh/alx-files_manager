import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStats(request, response) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    response.set('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify({ users, files })).end();
  }

  static async getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    response.set('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify({ redis: redisStatus, db: dbStatus })).end();
  }
}

export default AppController;
