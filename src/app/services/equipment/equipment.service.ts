import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Equipment } from '../../models/equipment/equipment.model'
import { AppConfig } from '../../config/app.config'

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  private itemsCollection: AngularFirestoreCollection<Equipment>
  private itemDocument: AngularFirestoreDocument<Equipment>

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Equipment>(`${AppConfig.collections.equipment}`)
  }

  public getAll() {
    return this.itemsCollection
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Equipment
          const id = a.payload.doc.id

          return { id, ...data }
        })
      }))
  }

  public save(equipment: Equipment) {
    return this.itemsCollection.add(equipment)
  }

  public getOne(id: String) {
    this.itemDocument = this.afs.doc<Equipment>(`${AppConfig.collections.equipment}/${id}`)
    return this.itemDocument.valueChanges();
  }

  public update(id: String, equipment: Equipment) {
    this.itemDocument = this.afs.doc<Equipment>(`${AppConfig.collections.equipment}/${id}`)
    return this.itemDocument.update(equipment)
  }

  public delete(id: String) {
    this.itemDocument = this.afs.doc<Equipment>(`${AppConfig.collections.equipment}/${id}`)
    return this.itemDocument.delete()
  }
}
