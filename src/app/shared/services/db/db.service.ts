// import { Injectable } from '@angular/core'
// import { AngularFirestore } from '@angular/fire/firestore';


// @Injectable({
//   providedIn: 'root',
// })
// export class DbService {
//   constructor(private firestore: AngularFirestore) { }

//   getCollection(collection) {
//     return this.firestore.collection(collection).snapshotChanges();
//   }
//   getCollectionById(collection, id) {
//     return this.firestore.collection(collection).doc(id).snapshotChanges();
//   }
//   createDoc(collection, value) {
//     return this.firestore.collection(collection).add(value);
//   }
//   updateDoc(collection, value, id) {
//     delete value.id;
//     this.firestore.doc(collection + '/' + id).update(value);
//   }
//   deleteDoc(collection, id) {
//     this.firestore.doc(collection + '/' + id).delete();
//   }
// }
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { QueryFilter } from 'src/app/shared/components/dynamic-field';
import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/auth/auth.service';
// import { database } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private ngUnsubscribe = new Subject();
  latestEntry: any;
  firstEntry: any;
  prevStrtAt: any = [];

  constructor(private fs: AngularFirestore, private toastr: ToastrService) {}

  getCollection(collection, query?) {
    return this.fs
      .collection(collection, query)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
        takeUntil(this.ngUnsubscribe)
      );
  }

  async paginateQuery(
    collection,
    offset: number,
    limit: number,
    flag: string,
    search: any,
    queryFilter?: Array<QueryFilter>
  ) {
    const query = this.fs.collection(collection, (ref) => {
      let refQuery: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      refQuery = refQuery.orderBy('createdAt', 'desc');
      // if (search.searchValue) {
      //   search.searchKey.forEach(element => {
      //     refQuery = refQuery.where(element.fieldName, '==', search.searchValue);
      //   });
      // }
      if (queryFilter) {
        queryFilter.forEach((field) => {
          if (field.fieldValue && field.fieldValue !== '')
            refQuery = refQuery.where(field.fieldName, field.operator, field.fieldValue);
        });
      }
      return refQuery;
    });
    const totalRecord = await query
      .get()
      .pipe(
        map((actions) => {
          return actions.docs.length;
        })
      )
      .toPromise()
      .then((value) => {
        return value;
      })
      .catch((error) => {
        return 0;
      });
    const queryCollection = this.fs.collection(collection, (ref) => {
      let refQuery: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      refQuery = refQuery.orderBy('createdAt', 'desc');
      // switch (flag) {
      //   case 'next': {
      //     refQuery = refQuery.startAfter(this.latestEntry).limit(limit);
      //     break;
      //   }
      //   case 'prev': {
      //     refQuery = refQuery.endBefore(this.getPrevStartAt(offset + 1)).limitToLast(limit);
      //     break;
      //   }
      //   case 'last': {
      //     refQuery = refQuery.limitToLast(totalRecord % limit);
      //     break;
      //   }
      //   case 'first': {
      //     refQuery = refQuery.limit(limit);
      //     break;
      //   }
      // }
      if (queryFilter) {
        queryFilter.forEach((field) => {
          if (field.fieldValue && field.fieldValue !== '')
            refQuery = refQuery.where(field.fieldName, field.operator, field.fieldValue);
        });
      }
      return refQuery;
    });
    const snapshot = await queryCollection
      .get()
      .pipe(
        map((actions) => {
          // this.firstEntry = actions.docs[0];
          // this.latestEntry = actions.docs[actions.docs.length - 1];
          // if (flag === 'first' || flag === 'last') this.prevStrtAt = [];
          // this.pushPrevStartAt(offset, this.firstEntry);
          return actions.docs.map((a) => {
            const data: any = a.data();
            const id = a.id;
            return { id, ...data };
          });
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .toPromise()
      .then((value) => {
        return { data: value, count: totalRecord };
      });
    return snapshot;
  }

  // Add Doc
  pushPrevStartAt(offset, prevFirstDoc) {
    const data = this.prevStrtAt.find((res) => res.index === offset);
    if (!data) this.prevStrtAt.push({ index: offset, data: prevFirstDoc });
  }

  // Return the Doc rem where previous page will startAt
  getPrevStartAt(offset) {
    const res = this.prevStrtAt.find((data) => {
      if (data.index === offset) return data;
    });
    return res.data;
  }

  getDoc(document) {
    return this.fs
      .doc(document)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return { id: doc.payload.id, ...(doc.payload.data() as {}) };
        }),
        takeUntil(this.ngUnsubscribe)
      );
  }

  getMQCollection(collection: string, queryFilter?: Array<QueryFilter>) {
    return this.fs
      .collection(collection, (ref) => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (queryFilter) {
          queryFilter.forEach((field) => {
            if (field.fieldValue && field.fieldValue !== '')
              query = query.where(field.fieldName, field.operator, field.fieldValue);
          });
        }
        return query;
      })
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
        takeUntil(this.ngUnsubscribe)
      );
  }

  async getLength(path: string, query: any): Promise<any> {
    return new Promise((resolve) => {
      this.fs
        .collection(path, query)
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.length;
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  async updateAt(path: string, data: object, dbFlag?: any): Promise<any> {
    // const user = this.authService?.currentUser?.value;
    const segments = path.split('/').filter((v) => v);
    const timeField = segments.length % 2 ? 'createdAt' : 'updatedAt';
    const userField = segments.length % 2 ? 'createdBy' : 'updatedBy';
    data[timeField] = new Date();
    // if (user !== null) data[userField] = user.id;
    if (segments.length % 2) {
      return this.fs
        .collection(path)
        .add(data)
        .then(
          (result) => {
            if (dbFlag === undefined) this.dbMessage('Data is added!', 'success');
            return result;
          },
          (error) => {
            return error;
          }
        );
    } else {
      return this.fs
        .doc(path)
        .set(data, { merge: true })
        .then(
          () => {
            if (dbFlag === undefined) this.dbMessage('Data is updated!', 'success');
          },
          (error) => {
            return error;
          }
        );
    }
  }

  delete(path: string) {
    return this.fs
      .doc(path)
      .delete()
      .then(
        () => {
          this.dbMessage('Data is deleted!', 'success');
          // this.loaderService.isLoading.next(false);
        },
        (error) => {
          this.dbMessage(error, 'error');
          // this.loaderService.isLoading.next(false);
        }
      );
  }

  dbMessage(message: string, msgType: string) {
    const showMsg = `<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">${msgType}</span> <span data-notify="message">${message}</span></div>`;
    this.toastr.show(showMsg, '', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      tapToDismiss: false,
      titleClass: 'alert-title',
      positionClass: 'toast-top-center',
      toastClass:
        msgType === 'error'
          ? 'ngx-toastr alert alert-dismissible alert-danger alert-notify'
          : 'ngx-toastr alert alert-dismissible alert-success alert-notify',
    });
  }

  getSetting(): Promise<any> {
    return new Promise((resolve, _) => {
      return this.getDoc('setting/systemSetting').subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  updateSetting(data, collection) {
    const setting = data[collection];
    const num = setting.slice(7);
    let ref = '';
    switch (collection) {
      case 'course':
        ref = 'CU00000' + (+num + 1);
        break;
      case 'project':
        ref = 'PR00000' + +(+num + 1);
        break;
      case 'agency':
        ref = 'AG00000' + +(+num + 1);
        break;
      case 'business':
        ref = 'BU00000' + +(+num + 1);
        break;
      case 'candidate':
        ref = 'CA00000' + +(+num + 1);
        break;
      case 'company':
        ref = 'CO00000' + +(+num + 1);
        break;
      case 'job':
        ref = 'JO00000' + +(+num + 1);
        break;
      case 'dica':
        ref = 'DI00000' + +(+num + 1);
        break;
      case 'mopfi':
        ref = 'MO00000' + +(+num + 1);
        break;
      case 'institute':
        ref = 'IN00000' + +(+num + 1);
        break;
    }
    data[collection] = ref;
    this.updateAt('setting/systemSetting', data, true);
  }
}
