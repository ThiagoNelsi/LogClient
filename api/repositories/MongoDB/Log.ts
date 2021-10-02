import { Collection, MongoClient, Document } from "mongodb";
import { ILogRepository } from "../../definitions/ILogRepository";

export class MongoDBLogRepository implements ILogRepository {

  private logsCollection: Collection<Document>;

  constructor(mongoDBConnection: MongoClient) {
    this.logsCollection = mongoDBConnection.db(process.env.DB_NAME).collection('logs');
  }

  create(log: string): void {
    this.logsCollection.insertOne({
      log
    });
  }

  async list(): Promise<string[]> {
    const logsCursor = await this.logsCollection.find();
    return (await logsCursor.toArray()).map(log => log.log);
  }

}
