import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { map, takeWhile } from 'rxjs/operators'
import { AppConfig } from '../../config/app.config'

@Injectable({
  providedIn: 'root'
})
export class SupplyStationService {
  private itemsCollection: AngularFirestoreCollection<SupplyStation>;
  private itemDocument: AngularFirestoreDocument<SupplyStation>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<SupplyStation>(`${AppConfig.collections.supplyStations}`);
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
    this.itemDocument = this.afs.doc<SupplyStation>(`${AppConfig.collections.supplyStations}/${key}`);
    return this.itemDocument.valueChanges();
  }

  public save(station: SupplyStation) {
    return this.itemsCollection.add(station);
  }

  public saveAll(stations: Array<SupplyStation>) {
    return new Promise((resolve, reject) => {
      stations.forEach(station => {
        try {
          this.itemsCollection.add(station);
        } catch (ex) {
          console.error(ex);
          throw new Error('El proceso de guarado fue interrumpido');
        }
      });
      resolve();
    });
  }

  public update(key: string, station: SupplyStation) {
    this.itemDocument = this.afs.doc<SupplyStation>(`${AppConfig.collections.supplyStations}/${key}`);
    return this.itemDocument.update(station);
  }

  public delete(key: string) {
    this.itemDocument = this.afs.doc<SupplyStation>(`${AppConfig.collections.supplyStations}/${key}`);
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
