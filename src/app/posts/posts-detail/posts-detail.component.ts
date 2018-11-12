import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {
  post: Post;
  editing = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getPost();
    console.log(this);
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService
      .getPostData(id)
      .subscribe(data => (this.post = data));
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

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.delete(id);
    //  redirect user
    this.router.navigate(['/blog']);
  }
}
