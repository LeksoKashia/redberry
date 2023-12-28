
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/service/blogs.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit{
  

  reactiveForm : FormGroup;
  public showError : boolean = false;
  public showSuccess : boolean = false;
  public isAuthed : boolean = false;


  constructor(private blogService: BlogsService, private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email : new FormControl(null)
    })
  }

  OnFormSubmitted() {
    const email = this.reactiveForm.value.email;
    this.blogService.login(email).subscribe(
      (response) => {
        console.log('Response status code:', response.status);
        this.showError = false
        this.showSuccess = true;
        
      },
      (error) => {
        console.error(error);
        this.showError = true
      }
    );

  }

  loginFinish(){

    this.isAuthed = true
    localStorage.setItem('isAuthed', JSON.stringify(this.isAuthed));
    const container = document.getElementById('moduri');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-dismiss', 'modal');
    container?.appendChild(button);
    button.click();
  }


  isInputFocused = false;

  onInputFocus() {
    this.isInputFocused = true;
    this.showError = false
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

}
