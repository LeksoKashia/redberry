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

  public displayBlogs: Blog[] = [];

  constructor(private blogService: BlogsService){}
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data
        this.displayBlogs = this.blogs;
        console.log(this.blogs);
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  filter(categories: number[]){
    if(categories.length > 0){
      this.displayBlogs = this.blogs.filter(blog =>{
        return blog.categories.some(category => categories.includes(category.id));
      })
    }else{
      console.log("kaira");
      
      this.displayBlogs = this.blogs
    }
   
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
