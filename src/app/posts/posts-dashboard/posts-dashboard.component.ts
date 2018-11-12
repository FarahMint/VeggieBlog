import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css']
})
export class PostsDashboardComponent implements OnInit {
  title: string;

  content: string;
  image: string = null;
  buttonText = 'Create Post';

  // var for image to upload
  uploadPercent: Observable<number>;
  // Download URL
  downloadURL: Observable<string>;
  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      title: this.title,
      content: this.content,
      image: this.image,
      published: new Date()
    };
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.image = '';

    //  change text btn
    this.buttonText = 'Post Created';
    // change back
    setTimeout(() => {
      this.buttonText = 'Create Post';
    }, 3000);
  }

  uploadImage(event) {
    // receive event from input -get 1rst file
    const file = event.target.files[0];
    // path inside our firebase storage
    const path = `posts/${file.name}`;

    // The storage path
    // const path = `test/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);
    // make sure user upload only image - Client-side validation
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The main task
    this.task = this.storage.upload(path, file);
    // observe percentage changes
    this.uploadPercent = this.task.percentageChanges();

    // The file's download URL
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.image = url));
        })
      )
      .subscribe();
  }
}
