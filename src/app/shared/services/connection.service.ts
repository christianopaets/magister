import {Injectable} from '@angular/core';
import {createConnection, Connection, ConnectionOptions} from 'typeorm';
import {Student} from '@entity/Student';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: '',
    port: 3306,
    username: 'christia_admin',
    password: 'V7MXXC3Q',
    database: 'christia_university',
    entities: [
      Student
    ],
    synchronize: true,
    logging: false
  };

  get connection(): Promise<Connection> {
    return createConnection(this._connectionOptions);
  }
}
