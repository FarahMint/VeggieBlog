import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Post } from './post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postdoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc')
    );
  }

  //  to get data -> retrieve from CRUD
  getPosts() {
    return this.postCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  //  we are subscribe it
  getPostData(id: string) {
    this.postdoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postdoc.valueChanges();
  }

  create(data: Post) {
    this.postCollection.add(data);
  }

  // Utility function -here we just need to use the adress of id
  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  delete(id: string) {
    return this.getPost(id).delete();
  }
  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }
}
