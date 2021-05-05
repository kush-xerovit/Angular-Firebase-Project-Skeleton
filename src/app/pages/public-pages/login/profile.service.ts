import { Injectable } from '@angular/core';
import { DbService } from '../../../shared/services/db/db.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private db: DbService) { }

  getProfiles() {
    return this.db.getCollection('profile');
  }
  getProfileById(id) {
    return this.db.getCollectionById('profile', id);
  }
  createProfile(profile) {
    return this.db.createDoc('profile', profile)
  }
  updateProfile(profile, id) {
    this.db.updateDoc('profile', profile, id);
  }
  deleteProfile(id: string) {
    this.db.deleteDoc('profile', id);
  }
}
