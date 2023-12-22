import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Category } from '../models/category';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'https://api.blog.redberryinternship.ge/api';
  private token = '09e7fdf907bc3fcfb7a3b13c1f183759f5b64b00b2fb89c7be8437a64b3ae10d';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ApiResponse<Category[]>> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`, { headers });
  }

  getBlogs(): Observable<ApiResponse<Blog[]>> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<ApiResponse<Blog[]>>(`${this.apiUrl}/blogs`, { headers });
  }


  getBlogById(blogId: number): Observable<Blog> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<Blog>(`${this.apiUrl}/blogs/${blogId}`, { headers });
  }


}
