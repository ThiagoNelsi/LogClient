import { MongoClient } from 'mongodb';

export class MongoDB {

  static connect() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rw1oj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri);
    return client.connect();
  }

  static disconnect(client: MongoClient) {
    return client.close();
  }

}
