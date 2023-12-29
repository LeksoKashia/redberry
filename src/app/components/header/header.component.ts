import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', ]
})

export class HeaderComponent implements AfterViewChecked {
  @Output() loginClicked = new EventEmitter<void>();
  public isAuthed: boolean = false;

  constructor(private blogService: BlogsService, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.isAuthed = this.blogService.isAuthed();
    this.cdr.detectChanges();
  }

  openModal() {
    this.loginClicked.emit();
  }

  logout(){
    localStorage.removeItem('isAuthed');
    localStorage.removeItem('title');
    localStorage.removeItem('description');
    localStorage.removeItem('publish_date');
    localStorage.removeItem('author');
    localStorage.removeItem('email');
    localStorage.removeItem('categories');
    localStorage.removeItem('authorValidateSuccess');
    localStorage.removeItem('titleValidateSuccess');
    localStorage.removeItem('descValidateSuccess');
    localStorage.removeItem('dateValidateSuccess');
    localStorage.removeItem('emailValidateSuccess');
  }
}
