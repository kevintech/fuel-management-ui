import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Driver } from '../../models/driver/driver.model';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DriverService {
  private itemsCollection: AngularFirestoreCollection<Driver>;
  private itemDocument: AngularFirestoreDocument<Driver>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Driver>('driver')
  }

  public getAll() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public get(key: string) {
    this.itemDocument = this.afs.doc<Driver>(`driver/${key}`);
    return this.itemDocument.valueChanges();
  }

  public save(driver: Driver) {
    return this.itemsCollection.add(driver);
  }

  public saveAll(drivers: Array<Driver>) {
    return new Promise((resolve, reject) => {
      drivers.forEach(driver => {
        try {
          this.itemsCollection.add(driver);
        }
        catch (ex) {
          console.error(ex);
          throw new Error('El proceso de guarado fue interrumpido');
        }
      });
      resolve();
    });
  }

  public update(key: string, station: Driver) {
    this.itemDocument = this.afs.doc<Driver>(`driver/${key}`);
    return this.itemDocument.update(station);
  }

  public delete(key: string) {
    this.itemDocument = this.afs.doc<Driver>(`driver/${key}`);
    return this.itemDocument.delete();
  }

  public deleteAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getAllKeys().then(listOfKeys => {
        if (listOfKeys.length === 0) { resolve(); }
        let batchProcess = [];
        listOfKeys.forEach(x => {
          batchProcess.push(this.delete(x));
        });
        Promise.all(batchProcess)
          .then(() => {
            resolve();
          }, (error) => {
            console.error(error);
            throw new Error('El proceso de eliminación fue interrumpido');
          });
      });
    });
  }

  private getAllKeys(): Promise<Array<string>> {
    let allKeysReturned = false;
    return new Promise((resolve, reject) => {
      const rowsToDelete = this.getAll().pipe(takeWhile(() => !allKeysReturned));
      rowsToDelete.subscribe(rows => {
        let listOfKeys = [];
        rows.forEach(x => {
          listOfKeys.push(x.id);
        });
        allKeysReturned = true;
        resolve(listOfKeys);
      });
    });
  }
}
