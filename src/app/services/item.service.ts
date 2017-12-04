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
    this.items = this.afs.collection('items').valueChanges();
   }

   getItems() {
     return this.items;
   }

}
