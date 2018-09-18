import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Driver } from '../../models/driver/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private itemsCollection: AngularFirestoreCollection<Driver>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Driver>('driver');
  }

  public getAll() {
    return this.itemsCollection.valueChanges();
  }

  public save(driver: Driver) {
    return this.itemsCollection.add(driver);
  }
}
