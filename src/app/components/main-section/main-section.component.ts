import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  @Output() selectedCategoriesChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  public categories: Category[] = [];
  public selectedCategories: string[] = [];

  constructor(private blogService: BlogsService) {}

  ngOnInit(): void {
    this.blogService.getCategories().subscribe(
      (response) => {
        this.categories = response.data;

        // Load selected categories from local storage
        const storedCategories = localStorage.getItem('selectedCategories');
        if (storedCategories) {
          this.selectedCategories = JSON.parse(storedCategories);
          this.emitSelectedCategories();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategoryStyles(category: Category): any {
    return {
      'background-color': category.background_color,
      'color': category.text_color,
      'border': this.isSelected(category) ? '2px solid black' : '2px solid transparent'
    };
  }

  isSelected(category: Category): boolean {
    return this.selectedCategories.includes(category.title);
  }

  toggleCategory(category: Category): void {
    const index = this.selectedCategories.indexOf(category.title);
    if (index !== -1) {
      // Remove category if already selected
      this.selectedCategories.splice(index, 1);
    } else {
      // Add category if not selected
      this.selectedCategories.push(category.title);
    }

    // Save selected categories to local storage
    localStorage.setItem('selectedCategories', JSON.stringify(this.selectedCategories));

    // Emit the updated selected categories
    this.emitSelectedCategories();
  }

  private emitSelectedCategories(): void {
    // Emit the selected categories to the parent component (HomeComponent)
    this.selectedCategoriesChanged.emit(this.selectedCategories);
  }
}
