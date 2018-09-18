import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SupplyStation } from '../../models/supply-station/supply-station.model';

@Injectable({
  providedIn: 'root'
})
export class SupplyStationService {
  private itemsCollection: AngularFirestoreCollection<SupplyStation>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<SupplyStation>('stations');
  }

  public getAll() {
    return this.itemsCollection.valueChanges();
  }

  public save(station: SupplyStation) {
    return this.itemsCollection.add(station);
  }
}
