import { Injectable } from '@angular/core';
import { User } from './user.model';
import { DbService } from '../../../shared/services/db/db.service';
import { FormService } from '../../../shared/services/form/form.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: DbService, private formService: FormService) { }

  // getUsers() {
  //   return this.db.getCollection('users');
  // }
  // getUserById(id) {
  //   return this.db.getCollectionById('users', id);
  // }
  // createUser(user: User) {
  //   return this.db.createDoc('users', user)
  // }
  // updateUser(user: User, id) {
  //   this.db.updateDoc('users', user, id);
  // }
  // deleteUser(id: string) {
  //   this.db.deleteDoc('users', id);
  // }
  async saveData(id, data: User) {
    const formData = await this.formService.formatData('users', data);
    this.db
      .updateAt(id !== undefined ? `users/${id}` : 'users', formData)
      .then(async (result: firebase.firestore.DocumentReference) => {
        // const agencyId = id !== undefined ? id : result.id;
        // this.router.navigate(['agency']);
      });
  }

  getUser(path): Promise<User> {
    return new Promise((resolve, _) => {
      return this.db.getDoc(path).subscribe((data: User) => {
        resolve(data);
      });
    });
  }

  async getAll(): Promise<Array<User>> {
    return new Promise((resolve, _) => {
      return this.db
        .getCollection('users')
        .pipe(
          map((data) => {
            return data.map((record) => {
              return record;
            });
          })
        )
        .subscribe((records: User[]) => {
          resolve(records);
        });
    });
  }

  delete(id) {
    this.db.delete(`users/${id}`);
  }
}
