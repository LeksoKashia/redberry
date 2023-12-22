import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public blogs: Blog[] = [];

  constructor(private blogService: BlogsService){}
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data
        console.log(this.blogs);
      },
      (error) => {
        console.error(error);
      }
    );
    
  }



  public openModal(): void {
    const container = document.getElementById('patara');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addEmployeeModal');

    container?.appendChild(button);
    button.click();
  }
}
