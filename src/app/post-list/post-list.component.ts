import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';

interface Post {
  id: number;
  title: string;
  // Include other properties you need
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @ViewChild('table') table!: Table;
  @ViewChild('paginator') paginator!: Paginator;

  posts: Post[] = [];
  totalRecords = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.http.get<Post[]>(url).subscribe((posts) => {
      this.posts = posts;
      this.totalRecords = this.posts.length;
    });
  }

  onPageChange(event: any) {
    const startIndex = event.first;
    const endIndex = startIndex + event.rows;
    this.posts = this.posts.slice(startIndex, endIndex);
  }
}
