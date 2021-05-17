import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db/db.service';
import { FormService } from '../../../shared/services/form/form.service';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: DbService, private formService: FormService
  ) { }

  // getProfiles() {
  //   return this.db.getCollection('profile');
  // }
  // getProfileById(id) {
  //   return this.db.getCollectionById('profile', id);
  // }
  // createProfile(profile) {
  //   return this.db.createDoc('profile', profile)
  // }
  // updateProfile(profile, id) {
  //   this.db.updateDoc('profile', profile, id);
  // }
  // deleteProfile(id: string) {
  //   this.db.deleteDoc('profile', id);
  // }

  async saveData(id, data: object) {
    const formData = await this.formService.formatData('profile', data);
    this.db
      .updateAt(id !== undefined ? `profile/${id}` : 'profile', formData)
      .then(async (result: firebase.firestore.DocumentReference) => {
        // const agencyId = id !== undefined ? id : result.id;
        // this.router.navigate(['agency']);
      });
  }

  getProfile(path): Promise<any> {
    return new Promise((resolve, _) => {
      return this.db.getDoc(path).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  async getAll(): Promise<Array<any>> {
    return new Promise((resolve, _) => {
      return this.db
        .getCollection('profile')
        .pipe(
          map((data) => {
            return data.map((record) => {
              return record;
            });
          })
        )
        .subscribe((records: any[]) => {
          resolve(records);
        });
    });
  }

  delete(id) {
    this.db.delete(`profile/${id}`);
  }
}
