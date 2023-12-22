import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit{

  public categories: Category[] = [];
  public categoryIds: number[] = [];


  constructor(private blogService: BlogsService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.blogService.getCategories().subscribe(
      (response) => {
        this.categories = response.data;
        console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getCategoryStyles(category: Category): any {
    return {
      'background-color': category.background_color,
      'color': category.text_color
    };
  }

  filter(category: Category){
    console.log(this.categoryIds);
    console.log(this.categoryIds.includes(category.id));
    
    if (this.categoryIds.includes(category.id)) {
      const selectedButton = this.el.nativeElement.querySelector(`.button-${category.id}`);
      this.renderer.setStyle(selectedButton, 'border', '2px solid transparent');
      const indexToRemove = this.categoryIds.indexOf(category.id);
      this.categoryIds.splice(indexToRemove, 1);

    } else {
      this.categoryIds.push(category.id);
      const selectedButton = this.el.nativeElement.querySelector(`.button-${category.id}`);
      this.renderer.setStyle(selectedButton, 'border', '2px solid black');
    }

  }

}
