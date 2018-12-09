import {createConnection, useContainer} from 'typeorm';
import {Container} from 'typedi';
import {createExpressServer} from 'routing-controllers';
import {StudentController} from './controller/StudentController';
import {GroupController} from './controller/GroupController';
import {Student} from './entity/Student';
import {Group} from './entity/Group';

useContainer(Container);
createConnection({
  'type': 'mysql',
  'host': 'localhost',
  'port': 3306,
  'username': 'christia_admin',
  'password': 'V7MXXC3Q',
  'database': 'christia_university',
  'synchronize': true,
  'logging': false,
  'entities': [
    Student,
    Group
  ],
  'cli': {
    'entitiesDir': 'routing/entity'
  }
}).then(async connection => {

    console.log('Connected. Now run express app');
    createExpressServer({
        controllers: [
          StudentController,
          GroupController
        ]
    }).listen(3000);
    console.log('Server is up and running on port 3000. Now send requests to check if everything works.');

}).catch(error => console.log('Error: ', error));
