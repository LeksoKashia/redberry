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
  private token = 'd67b05cbf32fe0f09b68a592abf5b7606fb3fdff837a417a94bae9bbf3635186';


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

  login(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,{ email }, { observe: 'response' })
  }

 

  isAuthed(){
    const isAuthed = localStorage.getItem('isAuthed');
    return JSON.parse(isAuthed)
  }


  addBlog(blog: any): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.post<any>(`${this.apiUrl}/blogs`, blog, { headers });
  }
  




}
