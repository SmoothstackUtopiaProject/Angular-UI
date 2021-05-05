import { Component, OnInit, ElementRef, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective} from 'ng-uikit-pro-standard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users/users.service';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit{

  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild('row', { static: true }) row!: ElementRef;

  user!: User;
  userList: User[] =[];
  headElements = ['ID', 'First', 'Last', 'Email', 'Phone', 'Role', 'Update', 'Delete', 'Password Recovery'];
  editFormUser!: FormGroup;
  createFormUser!: FormGroup;
  selected!: User;
  searchText!: string ;
  previous!: string;
  errorMessage = '';
  hideMenu!: string | null;
  page!: any;
  sorted = false;
  loading!: boolean;
  updateTable!: boolean;


  formData = {
    userId: [''],
    userFirstName: [''],
    userLastName: [''],
    userEmail: [''],
    userPhone: [''],
    userRole: [''],
    userPassword: ['']
  };



  constructor(private userService: UsersService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private dashboard: DashboardComponent
    ) { }

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

returnToDashboard(){
  this.dashboard.returnToDashboard();

}

  getAllUsers(){
    this.loading = true
      this.userService.getAllUsers().subscribe(
        response =>{
          this.loading = false;
          this.mdbTable.setDataSource(response);
          this.userList = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }, err =>{
          console.log(err);
        }
        )
  }

  refreshTable(){
    this.updateTable = true
      this.userService.getAllUsers().subscribe(
        response =>{
          this.updateTable = false;
          this.mdbTable.setDataSource(response);
          this.userList = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }, err =>{
          console.log(err);
        }
        )
  }

  sortBy(by: string | any): void {
    console.log(this.userList)

    this.userList.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
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

  openDeleteModal(targetModal:any, user:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  
    this.selected = user;
  }

  onSubmitCreate(){
    this.userService.createUser(this.createFormUser.getRawValue()).subscribe(
      data=>{
        this.modalService.dismissAll();
        this.createFormUser.reset();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      }
    )
  }


  onSubmitUpdate() {
    this.userService.updateUser(this.editFormUser.getRawValue()).subscribe(
      data=>{
        this.modalService.dismissAll();
        this.editFormUser.reset();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      }
    )
  }
  
  onSubmitDelete() {
    this.userService.deleteUser(this.selected)
    .subscribe(
      data=>{
        this.modalService.dismissAll();
        this.refreshTable()
      }, error => {
        this.errorMessage = error.error;
      })
  }



}
