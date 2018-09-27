import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Driver } from '../../models/driver/driver.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private itemsCollection: AngularFirestoreCollection<Driver>;
  private itemDocument: AngularFirestoreDocument<Driver>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Driver>('driver');
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
          throw new Error("El proceso fue interrumpido");
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
    console.log("start deleteAll");
    // let test = this.itemsCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     console.log("action", a);
    //     return a.payload.doc.ref;
    //     //batchProcess.push(action.payload.doc.ref.delete());
    //   }))
    // );
    // test.forEach(x => {
    //   x.forEach(y => {
    //     console.log(y);
    //   })
    // })

    return new Promise((resolve, reject) => {
      this.getAllKeys()
        .then(deleted => {
          console.log("list of promises", deleted);
          Promise.all(deleted).then(() => {
            console.log("all deleted");
            resolve();
          });
        });
    });
  }

  private getAllKeys(): Promise<Array<Promise<void>>> {
    return new Promise((resolve, reject) => {
      let batchProcess = [];
      this.getAll().forEach(drivers => drivers.forEach(d => {
        console.log(d.id);
        batchProcess.push(this.delete(d.id));
      }));
      resolve(batchProcess);
    });
  }
}
