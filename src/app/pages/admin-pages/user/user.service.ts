import { Injectable } from '@angular/core';
import { User } from './user.model';
import { DbService } from '../../../shared/services/db/db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: DbService) { }

  getUsers() {
    return this.db.getCollection('users');
  }
  getUserById(id) {
    return this.db.getCollectionById('users', id);
  }
  createUser(user: User) {
    return this.db.createDoc('users', user)
  }
  updateUser(user: User, id) {
    this.db.updateDoc('users', user, id);
  }
  deleteUser(id: string) {
    this.db.deleteDoc('users', id);
  }
}
