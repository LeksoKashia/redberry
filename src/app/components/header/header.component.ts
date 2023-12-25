import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewChecked{
  @Output() loginClicked = new EventEmitter<void>();
  public isAuthed : boolean = false;

  constructor(private blogService: BlogsService){}
  ngAfterViewChecked(): void {
    this.isAuthed = this.blogService.isAuthed();
  }


  openModal(){
    this.loginClicked.emit();
  }
}
