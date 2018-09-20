import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { SupplyStation } from '../../models/supply-station/supply-station.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplyStationService {
  private itemsCollection: AngularFirestoreCollection<SupplyStation>;
  private itemDoc: AngularFirestoreDocument<SupplyStation>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<SupplyStation>('stations');
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
    this.itemDoc = this.afs.doc<SupplyStation>(`stations/${key}`);
    return this.itemDoc.valueChanges();
  }

  public save(station: SupplyStation) {
    return this.itemsCollection.add(station);
  }
}
