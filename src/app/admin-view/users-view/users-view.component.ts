import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  user!: User;
  userList: User[] =[];
  editFormUser!: FormGroup;
  createFormUser!: FormGroup;
  selected!: User;
  formData = {
    userId: [''],
    userFirstName: [''],
    userLastName: [''],
    userEmail: [''],
    userPhone: [''],
    userRole: ['']
  };
  errorMessage = '';

  constructor(private userService: UsersService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.editFormUser = this.fb.group(this.formData);
    this.createFormUser = this.fb.group(this.formData);
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      response =>{
        this.userList = response;
        return response
      }, err =>{
        console.log(err)
      }
    )
  }

  openCreateModal(targetModal:any, user:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  }

  openEditModal(targetModal:any, user:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editFormUser.patchValue({
      userId: user.userId,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userRole: user.userRole
    });
  }

  openDeleteModal(targetModal:any, user:User) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  
    this.selected = user;
  }

  onSubmitCreate(){
    this.userService.createUser(this.createFormUser.getRawValue()).subscribe(
      data=>{
        this.getAllUsers();
        this.modalService.dismissAll();
        this.createFormUser.reset();
        console.log(data)
      }, error => {
        console.log(error.error.error);
        this.errorMessage = error.error.error;
      }
    )
  }

  onSubmitUpdate() {
    this.userService.updateUser(this.editFormUser.getRawValue()).subscribe(
      data=>{
        this.getAllUsers();
        this.modalService.dismissAll();
        this.editFormUser.reset();
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
  
  onSubmitDelete() {
    this.userService.deleteUser(this.selected).subscribe(
      data=>{
        this.getAllUsers();
        this.modalService.dismissAll();
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }



}
