import { Component, Input, OnInit } from '@angular/core';
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
  public allBlogs! : Blog[];
  @Input() simillarBlogs! : Blog[];
  public currentCategories: any;

  public count: number = 0;

  public sliderBlogs : any = [];


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

  decreaseSlider(){
    this.count--;
  }


  increaseSlider(){
    this.count++;
  }

  ngOnInit() {
    const isAuthed = localStorage.getItem('isAuthed');
    console.log(JSON.parse(isAuthed));
    
    this.route.params.subscribe((params) => {
      const blogId = +params['id'];

      this.blogService.getBlogById(blogId).subscribe(
        (response) => {
          
          this.blog = response
          this.currentCategories = response.categories.map(category => category.id);
          console.log(this.currentCategories);
          if(this.allBlogs){
            this.simillarBlogs = this.allBlogs.filter(blog => {
              return blog.categories.some(category => this.currentCategories.includes(category.id)) && blog.id != this.blog.id;
            });

            this.getSlider(this.simillarBlogs);
            
          }

          this.count = 0;
          
        },
        (error) => {
          console.error(error);
        }
      );
      
     
   
    });

 
    
    this.blogService.getBlogs().subscribe(
      (response) => {
        this.allBlogs = response.data.filter(blog => {
          const publishDate = new Date(blog.publish_date);
          const currentDate = new Date();
          return publishDate <= currentDate;
        });
  
        
        this.simillarBlogs = this.allBlogs.filter(blog => {
          return blog.categories.some(category => this.currentCategories.includes(category.id)) && blog.id != this.blog.id;
        });

        this.getSlider(this.simillarBlogs);
        
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  getSlider(simillarBlogs: Blog[]){
    this.sliderBlogs = []
    let mainCount = simillarBlogs.length
    let count = 0
    let newArr : any = [];

    for (let index = 0; index < simillarBlogs.length; index++) {
        newArr.push(simillarBlogs[index])
        count++;
        if(mainCount <= 3){
            if (count === mainCount){

              this.sliderBlogs.push(newArr);
            }
        }else if(mainCount % 3 == 0){
            if (count === 3){
                this.sliderBlogs.push(newArr);
                newArr = [];
                count = 0;
            }
        }else{
            if (count === 3){
                console.log(index)
                this.sliderBlogs.push(newArr);
                newArr = [];
                count = 0;
            }else if (index + 1 == mainCount){
                this.sliderBlogs.push(newArr);
            }
        }
        
    }
  }


  getCategoryStyles(category: Category): any {
    return {
      'background-color': category.background_color,
      'color': category.text_color
    };
  }


  public openModal(): void {
    const container = document.getElementById('blog-section');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addEmployeeModal');

    container?.appendChild(button);
    button.click();
  }

}