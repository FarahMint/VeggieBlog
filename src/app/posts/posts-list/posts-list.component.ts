import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  //  var to hold data
  post: Post;
  editing = false;
  posts: Observable<Post[]>;
  constructor(private postService: PostService, public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.posts = this.postService.getPosts();
    // console.log(this);
  }

  updatePost() {
    //  create obj to hold data
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    //  need to get id
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    // need change editing
    this.editing = false;
  }
  delete(id: string) {
    this.postService.delete(id);
  }
}
