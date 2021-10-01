import fs from 'fs';
import { ILogRepository } from "../definitions/ILogRepository";

export class LocalFileRepository implements ILogRepository {

  create(log: string) {
    fs.writeFile('./logs.log', `${log}\n`, { encoding: 'utf8', flag: 'a' }, () => {});
  }

  async list() {
    const logs = fs.readFileSync('./logs.log', { encoding: 'utf8' }).split('\n');
    if (logs[logs.length - 1].length === 0) logs.pop()
    return logs;
  }

}
