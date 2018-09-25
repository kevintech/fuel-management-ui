import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Driver } from '../../models/driver/driver.model';
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
    drivers.forEach(driver => {
      try {
        console.log(driver);
        this.itemsCollection.add(driver);
      }
      catch(ex) {
        throw new Error("El proceso fue interrumpido");
      }
    });

    return true;
  }

  public update(key: string, station: Driver) {
    this.itemDocument = this.afs.doc<Driver>(`driver/${key}`);
    return this.itemDocument.update(station);
  }

  public delete(key: string) {
    this.itemDocument = this.afs.doc<Driver>(`driver/${key}`);
    return this.itemDocument.delete();
  }
}
