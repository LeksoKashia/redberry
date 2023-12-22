import { Component, Input } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss', '../main-section/main-section.component.scss']
})
export class BlogComponent {
  @Input() blog! : Blog;

  getCategoryStyles(category: Category): any {
    return {
      'background-color': category.background_color,
      'color': category.text_color
    };
  }
}
