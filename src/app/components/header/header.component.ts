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
}
