import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { Category } from 'src/app/models/category';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  public allCategories! : Category[];
  public allBlogs! : Blog[];
  public simillarBlogs! : Blog[];
  public currentCategories!: any;
  public blog: Blog = {
    id: 0,
    title: '',
    description: '',
    image: '',
    publish_date: '',
    email: '',
    author: '',
    categories: []
  }

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}


  ngOnInit() {
    this.route.params.subscribe((params) => {
      const blogId = +params['id'];

      this.blogService.getBlogById(blogId).subscribe(
        (response) => {
          
          this.blog = response
          this.currentCategories = response.categories.filter(category =>{  
            return category.id
          })
          console.log(this.currentCategories);
          
        },
        (error) => {
          console.error(error);
        }
      );
      
    });


    
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.allBlogs = response.data
        console.log(this.allBlogs);

        this.simillarBlogs = this.allBlogs.filter(blog => {
          return blog.categories.some(category => this.currentCategories.includes(category.id));
        });

        console.log(this.simillarBlogs);
        
      },
      (error) => {
        console.error(error);
      }
    );


  //  console.log(this.allBlogs);

   


    // console.log(this.simillarBlogs, "simmilar");
    
  }


  getCategoryStyles(category: Category): any {
    return {
      'background-color': category.background_color,
      'color': category.text_color
    };
  }

}