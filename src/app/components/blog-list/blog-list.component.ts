import { Component, Input, OnInit} from '@angular/core';
import { Blog } from 'src/app/models/blog';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit{

  @Input() blogs!: Blog[];

  ngOnInit(): void {}

}
