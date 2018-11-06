import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';
import { map, takeWhile } from 'rxjs/operators';
import { AppConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class OilEntryService {
  private itemsCollection: AngularFirestoreCollection<OilEntry>;
  private itemDocument: AngularFirestoreDocument<OilEntry>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<OilEntry>(`${AppConfig.collections.oilEntry}`);
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

  public getOne(key: string) {
    this.itemDocument = this.afs.doc<OilEntry>(`${AppConfig.collections.oilEntry}/${key}`);
    return this.itemDocument.valueChanges();
  }

  public save(station: OilEntry) {
    return this.itemsCollection.add(station);
  }

  public update(key: string, station: OilEntry) {
    this.itemDocument = this.afs.doc<OilEntry>(`${AppConfig.collections.oilEntry}/${key}`);
    return this.itemDocument.update(station);
  }

  public delete(key: string) {
    this.itemDocument = this.afs.doc<OilEntry>(`${AppConfig.collections.oilEntry}/${key}`);
    return this.itemDocument.delete();
  }

  public getByDate(date: string) {
    return this.afs.collection<OilEntry>(`${AppConfig.collections.oilEntry}`, ref => ref.where('date', '==', date)).valueChanges();
  }
}
