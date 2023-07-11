import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
  // Include other properties you need
}

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  postId: number = 0;
  post: Post = {
    id: 0,
    title: '',
    body: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.loadPost();
    });
  }

  loadPost() {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}`;
    this.http.get<Post>(url).subscribe((post) => {
      this.post = post;
    });
  }

  saveChanges() {
    const url = `https://jsonplaceholder.typicode.com/posts/${this.postId}`;
    this.http.put<Post>(url, this.post).subscribe((updatedPost) => {
      this.post = updatedPost;
      this.router.navigate(['/']);
    });
  }
}
