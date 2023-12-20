import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'https://api.blog.redberryinternship.ge/api/categories';
  private token = '592072cfb7e716e008df6afa4edca3d8c646db5222e97b2270d074329d197e9d';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ApiResponse> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<ApiResponse>(this.apiUrl, { headers });
  }

}
