import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { map } from 'rxjs/operators'
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

  public update(key: string, station: SupplyStation) {
    this.itemDocument = this.afs.doc<SupplyStation>(`${AppConfig.collections.supplyStations}/${key}`);
    return this.itemDocument.update(station);
  }

  public delete(key: string) {
    this.itemDocument = this.afs.doc<SupplyStation>(`${AppConfig.collections.supplyStations}/${key}`);
    return this.itemDocument.delete();
  }
}
