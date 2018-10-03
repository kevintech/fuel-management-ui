import { Injectable } from '@angular/core'
import { map, takeWhile } from 'rxjs/operators'
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

  public saveAll(equipments: Array<Equipment>) {
    return new Promise((resolve, reject) => {
      equipments.forEach(equipment => {
        try {
          this.itemsCollection.add(equipment);
        } catch (ex) {
          console.error(ex);
          throw new Error('El proceso de guarado fue interrumpido');
        }
      });
      resolve();
    });
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
