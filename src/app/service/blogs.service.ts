import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'https://api.blog.redberryinternship.ge/api/categories';
  private token = 'f8481d3c42fe193d45747b1577c74befca5239b078330b7c28b1efe0b2c0c553';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ApiResponse> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<ApiResponse>(this.apiUrl, { headers });
  }

}
