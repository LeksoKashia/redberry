import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public blogs: Blog[] = [];
  public displayBlogs: Blog[] = [];
  public selectedCategories: string[] = [];

  constructor(private blogService: BlogsService) {}

  ngOnInit(): void {
    console.log('Current Date:', new Date());
  
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.blogs = response.data.filter(blog => {
          const publishDate = new Date(blog.publish_date);
          const currentDate = new Date();
          return publishDate <= currentDate;
        });
  
        // Filter blogs based on the publish date condition
        this.displayBlogs = this.blogs;
  
        this.filterBlogsBasedOnCategories();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  onSelectedCategoriesChanged(categories: string[]): void {
    this.selectedCategories = categories;
    this.filterBlogsBasedOnCategories();
  }

  private filterBlogsBasedOnCategories(): void {
    if (this.blogs.length > 0 && this.selectedCategories.length > 0) {
      this.displayBlogs = this.blogs.filter((blog) =>
        blog.categories.some((category) => this.selectedCategories.includes(category.title))
      );
    } else {
      this.displayBlogs = this.blogs;
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
