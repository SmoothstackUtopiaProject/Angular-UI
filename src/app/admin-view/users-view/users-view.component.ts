import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit, AfterViewInit{

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable!: MdbTableDirective;

  user!: User;
  userList: User[] =[];
  headElements = ['ID', 'First', 'Last', 'Email', 'Phone', 'Role', 'Update', 'Delete', 'Password'];
  editFormUser!: FormGroup;
  createFormUser!: FormGroup;
  searchText!: string ;
  previous!: string;
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
  loading!: boolean;

  constructor(private userService: UsersService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef) { }

    @HostListener('input') oninput() {
      this.searchItems();
  }
  
  ngOnInit(): void {
    this.getAllUsers();
    this.editFormUser = this.fb.group(this.formData);
    this.createFormUser = this.fb.group(this.formData);
    
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.userList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.userList = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }
}


  getAllUsers(){
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      response =>{
        this.userList = response;
        this.mdbTable.setDataSource(this.userList);
        this.userList = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
        return this.loading = false;
      }, err =>{
        this.loading = false;
        console.log(err)
      }
    )
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
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
