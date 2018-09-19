import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Equipment } from '../../models/equipment/equipment.model'

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  private itemsCollection: AngularFirestoreCollection<Equipment>

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Equipment>('equipment')
  }

  public getAll() {
    return this.itemsCollection.valueChanges()
  }

  public save(equipment: Equipment) {
    return this.itemsCollection.add(equipment)
  }
}
