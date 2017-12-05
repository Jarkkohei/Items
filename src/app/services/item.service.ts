import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from '../models/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {

    //  Return Firestore collection named 'items' as a observable, 
    //  so that it emits the collection whenever any of its value changes.
    //this.items = this.afs.collection('items').valueChanges();

    //  Set our itemsCollection as the actual Firestore collection.
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));

    //  Return the snapshot of the Firestore collection named 'items' as a observable. 
    //  Map the changes and also get the id of each item in the collection.
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getItems() {
     return this.items;
   }

   addItem(item: Item) {
    this.itemsCollection.add(item);
   }

}
