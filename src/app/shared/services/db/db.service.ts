import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) { }

  getCollection(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }
  getCollectionById(collection, id) {
    return this.firestore.collection(collection).doc(id).snapshotChanges();
  }
  createDoc(collection, value) {
    return this.firestore.collection(collection).add(value);
  }
  updateDoc(collection, value, id) {
    delete value.id;
    this.firestore.doc(collection + '/' + id).update(value);
  }
  deleteDoc(collection, id) {
    this.firestore.doc(collection + '/' + id).delete();
  }
}
