import fs from 'fs';
import path from 'path';
import { ILogRepository } from "../../definitions/ILogRepository";

export class LocalFileRepository implements ILogRepository {

  create(log: string) {
    fs.writeFile(path.resolve(__dirname, '../logs.log'), `${log}\n`, { encoding: 'utf8', flag: 'a' }, () => {});
  }

  async list() {
    const logs = fs.readFileSync(path.resolve(__dirname, '../logs.log'), { encoding: 'utf8' }).split('\n');
    if (logs[logs.length - 1].length === 0) logs.pop()
    return logs;
  }

}
