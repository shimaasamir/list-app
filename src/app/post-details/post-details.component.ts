import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Post {
  id: number;
  title: string;
  body: string;
  // Include other properties you need
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
  }

  loadPost(postId: string) {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    this.http.get<Post>(url).subscribe((post) => {
      this.post = post;
    });
  }

  loadComments(postId: string) {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    this.http.get<Comment[]>(url).subscribe((comments) => {
      this.comments = comments;
    });
  }
}
