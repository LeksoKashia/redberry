import { Component, Input, OnInit} from '@angular/core';
import { Blog } from 'src/app/models/blog';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent{

  @Input() blogs!: Blog[];


  shouldApplyMargin(index: number): boolean {
    return (index + 1) % 3 !== 0;
  }

}
