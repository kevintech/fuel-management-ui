import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { AppConfig } from '../../config/app.config'
import { FuelEntryDetail } from '../../models/fuel-entry/fuel-entry-detail.model';

@Injectable({
  providedIn: 'root'
})

export class FuelEntryService {
  private itemsCollection: AngularFirestoreCollection<FuelEntry>
  private itemDocument: AngularFirestoreDocument<FuelEntry>

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<FuelEntry>(`${AppConfig.collections.fuelEntry}`)
  }

  public getAll() {
    return this.itemsCollection
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as FuelEntry
          const id = a.payload.doc.id

          return { id, ...data }
        })
      }))
  }

  public save(entry: FuelEntry) {
    return this.itemsCollection.add(entry)
  }

  public getOne(id: String) {
    this.itemDocument = this.afs.doc<FuelEntry>(`${AppConfig.collections.fuelEntry}/${id}`)
    return this.itemDocument.valueChanges();
  }

  public update(id: String, entry: FuelEntry) {
    this.itemDocument = this.afs.doc<FuelEntry>(`${AppConfig.collections.fuelEntry}/${id}`)
    return this.itemDocument.update(entry)
  }

  public delete(id: String) {
    this.itemDocument = this.afs.doc<FuelEntry>(`${AppConfig.collections.fuelEntry}/${id}`)
    return this.itemDocument.delete()
  }

  public addDetail(entry: FuelEntry, detail: FuelEntryDetail, id: string) {
    if (!entry.detail) entry.detail = [];
    entry.detail.push(detail);
    this.itemDocument = this.afs.doc<FuelEntry>(`${AppConfig.collections.fuelEntry}/${id}`);
    return this.itemDocument.update(entry);
  }

  public getByDate(date: string) {
    return this.afs.collection<FuelEntry>(`${AppConfig.collections.fuelEntry}`, ref => ref.where('date', '==', date)).valueChanges();
  }
}
