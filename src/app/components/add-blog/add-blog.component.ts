import { Component } from '@angular/core';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss', '../header/header.component.scss']
})
export class AddBlogComponent{
  categories = ['games', 'sports', 'movies'];
  selectedCategory: string | null = null;
  dropdownVisible = false;

  ngOnInit() {
    // Initialize the dropdown to be hidden
    this.dropdownVisible = false;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.dropdownVisible = false;
  }

  removeCategory() {
    this.selectedCategory = null;
  }
}