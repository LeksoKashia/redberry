import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BlogsService } from 'src/app/service/blogs.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss', '../header/header.component.scss']
})
export class AddBlogComponent implements OnInit{
  blog: any;
  addBlogForm: FormGroup;
  file: File;
  showUpload : boolean = true;
  imageName : string;


  constructor(private blogService: BlogsService, private el: ElementRef) {}

  ngOnInit(): void {
    this.addBlogForm = new FormGroup({
      title: new FormControl(localStorage.getItem('title') || ''),
      description: new FormControl(localStorage.getItem('description') || ''),
      publish_date: new FormControl(localStorage.getItem('publish_date') || ''),
      author: new FormControl(localStorage.getItem('author') || ''),
      email: new FormControl(localStorage.getItem('email') || ''),
      categories: new FormControl(localStorage.getItem('categories') || '')
    });
  
    
    this.addBlogForm.valueChanges.subscribe((formValues) => {
      localStorage.setItem('title', formValues.title);
      localStorage.setItem('description', formValues.description);
      localStorage.setItem('publish_date', formValues.publish_date);
      localStorage.setItem('author', formValues.author);
      localStorage.setItem('email', formValues.email);
      localStorage.setItem('categories', JSON.stringify(formValues.categories));
    });
  }
  
  photoValidateSuccess: boolean = false;
  handleFileInput(event: any): void {
 
    console.log("lekso");
    
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.file = fileList[0];
      this.imageName = this.file.name;
      console.log(this.file.name);
      this.showUpload = false;
      this.photoValidateSuccess = true;
      
    }
  }


  setBorder : boolean;
  closeUpload(){
    this.showUpload = true;
    this.photoValidateSuccess = false;
    this.setBorder = true;

  }

  OnFormSubmitted() {
    const container = document.getElementById('addBlog');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addEmployeeModal');

    container?.appendChild(button);
    button.click();

    const formData = new FormData();

    if (this.file) {
      formData.append('image', this.file, this.file.name);
    }

   

    this.blog = {
      title: this.addBlogForm.value.title,
      description: this.addBlogForm.value.description,
      publish_date: this.addBlogForm.value.publish_date,
      author: this.addBlogForm.value.author,
      email: this.addBlogForm.value.email,
      categories: [1, 2, 3, 4],
    };
    console.log(this.blog);

    let emailValue = this.blog.email;


    if (emailValue === null) {
      emailValue = '';
    }


    formData.append('title', this.blog.title);
    formData.append('description', this.blog.description);
    formData.append('publish_date', this.blog.publish_date);
    formData.append('author', this.blog.author);
    formData.append('email', emailValue);
    formData.append('categories', JSON.stringify(this.blog.categories));

    console.log(formData);

    this.blogService.addBlog(formData).subscribe(
      (response) => {
        console.log('Response status code:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isButtonDisabled(): boolean {
    return !(this.authorValidateSuccess && this.titleValidateSuccess && this.descValidateSuccess && this.dateValidateSuccess && this.emailValidateSuccess && this.photoValidateSuccess);
  }
///author validate
  authorFocus : Boolean;
  addFocusStyles() {
    this.authorFocus = true;
  }

  addBlurStyles(){
    this.authorFocus = false;
  }


  authorValidateError: boolean;
  authorValidateSuccess: boolean;
  authorSymbolsError: boolean;
  authorSymbolsSuccess: boolean;
  authorWordsError: boolean;
  authorWordsSuccess: boolean;
  authorGeorgianError: boolean;
  authorGeorgianSuccess: boolean;
  validateAuthor(event: any) {
    console.log(this.authorValidateSuccess);
    
    const author = event.target.value;

    if (author.trim().length < 4) {
      this.authorSymbolsError = true;
      this.authorSymbolsSuccess = false;
    } else {
      this.authorSymbolsError = false;
      this.authorSymbolsSuccess = true;
    }
  
    const trimmedValue = author.trim();
    const words = trimmedValue.split(/\s+/);
    if (words.length >= 2) {
      this.authorWordsSuccess = true;
      this.authorWordsError = false;

    } else {
      this.authorWordsError = true;
      this.authorWordsSuccess = false;
    }

    const georgianRegex = /^[\u10A0-\u10FF\s]+$/; 
    if (georgianRegex.test(trimmedValue)) {
      this.authorGeorgianError = false;
      this.authorGeorgianSuccess= true;
    } else {
      this.authorGeorgianError = true;
      this.authorGeorgianSuccess= false;
    }


    if(this.authorGeorgianSuccess && this.authorWordsSuccess && this.authorSymbolsSuccess){
      this.authorValidateSuccess = true;
      this.authorValidateError = false;
    }else{
      this.authorValidateError = true;
      this.authorValidateSuccess = false;
    }
  }


  //title validate
  titleFocus : Boolean;
  addFocusTitle() {
    this.titleFocus = true;
  }

  addBlurTitle(){
    this.titleFocus = false;
  }
  
  titleValidateError: boolean;
  titleValidateSuccess: boolean;
  titleSymbolsError: boolean;
  titleSymbolsSuccess: boolean;
  validateTitle(event: any) { 
    const title = event.target.value;
    if (title.trim().length < 2) {
      this.titleSymbolsSuccess = false;
      this.titleSymbolsError = true;
    } else {
      this.titleSymbolsSuccess = true;
      this.titleSymbolsError = false;
    }

    if(this.titleSymbolsSuccess){
      this.titleValidateSuccess = true;
      this.titleValidateError = false;
    }else{
      this.titleValidateSuccess = false;
      this.titleValidateError = true;
    }
  }




  //desc validate
  descFocus : Boolean;
  addFocusDesc() {
    this.descFocus = true;
  }

  addBlurDesc(){
    this.descFocus = false;
  }
  
  descValidateError: boolean;
  descValidateSuccess: boolean;
  descSymbolsError: boolean;
  descSymbolsSuccess: boolean;
  validateDesc(event: any) { 
    const desc = event.target.value;
    if (desc.trim().length < 2) {
      this.descSymbolsSuccess = false;
      this.descSymbolsError = true;
    } else {
      this.descSymbolsSuccess = true;
      this.descSymbolsError = false;
    }

    if(this.descSymbolsSuccess){
      this.descValidateSuccess = true;
      this.descValidateError = false;
    }else{
      this.descValidateSuccess = false;
      this.descValidateError = true;
    }
  }


  dateFocus : Boolean;
  addFocusDate() {
    this.dateFocus = true;
  }

  addBlurDate(){
    this.dateFocus = false;
  }

  dateValidateSuccess: boolean;
  validateDate(event: any) { 
    const date = event.target.value;
    if(date){
      this.dateValidateSuccess = true;
    }else{
      this.dateValidateSuccess = false;
    }

  }



  //email validation
  emailFocus : Boolean;
  addFocusEmail() {
    this.emailFocus = true;
  }

  addBlurEmail(){
    this.emailFocus = false;
  }
  
  emailDifferentError : boolean;
  emailDifferentSuccess : boolean;
  emailValidateSuccess: boolean = true;
  emailError: boolean;
  validateEmail(event: any) {
    const email = event.target.value;
    if(email.length == 0){
      this.emailValidateSuccess = true;
      this.emailError = false;
      this.emailDifferentError = false;
      this.emailDifferentSuccess = false;
    }else{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.endsWith("redberry.ge") && emailRegex.test(email)) {
        this.emailError = false;
        this.emailValidateSuccess = true;
        this.emailDifferentSuccess = true;
        this.emailDifferentError = false;
      } else {
        this.emailError = true;
        this.emailValidateSuccess = false;
        this.emailDifferentSuccess = false;
        this.emailDifferentError = true;
      }
    }
  
  }
  




}