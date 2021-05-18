import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  LoggerConfig,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
  NGXMapperService,
} from 'ngx-logger';
import {
  NGXLoggerHttpServiceMock,
  NGXMapperServiceMock,
} from 'ngx-logger/testing';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { CreateUser, User } from 'src/app/model/user';
import { Role } from 'src/app/model/role';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NGXLogger,
        { provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock },
        { provide: NGXMapperService, useClass: NGXMapperServiceMock },
        { provide: LoggerConfig, useValue: { level: NgxLoggerLevel.ERROR } },
        DatePipe,
      ],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all users from current endpoint', () => {
    const mock1: User = {
      userId: 1,
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.com',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
      userToken: 'e455fdfc3-e86f-4833-9ee0-96dfdde4709ca',
    };
    const mock2: User = {
      userId: 2,
      userFirstName: 'NG',
      userLastName: 'Java',
      userEmail: 'angularJava@test.com',
      userPassword: 'Sm343434321',
      userPhone: '8345358800',
      userRole: Role.USER,
      userToken: 'e4fd29c3-e86f-4833-9ee0-96dfd4709ca',
    };

    const mock3: User = {
      userId: 3,
      userFirstName: 'Angular',
      userLastName: 'Test',
      userEmail: 'tur434@test.com',
      userPassword: 'Smfsfdas',
      userPhone: '84324244800',
      userRole: Role.ADMIN,
      userToken: 'e4552dfdc3-e86f-4833-9ee0-9640defdf09ca',
    };

    let mockResponse: Array<User> = [mock1, mock2, mock3];

    service.getAllUsers().subscribe((res: any) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(environment.usersEndpoint);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockResponse);
  });

  it('should PUT new user data', () => {
    const mock1: User = {
      userId: 1,
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.commmm',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
      userToken: 'e455fdfc3-e86f-4833-9ee0-96dfdde4709ca',
    };
    const mockResponse: User = {
      userId: 1,
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.commmm',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
      userToken: 'e455fdfc3-e86f-4833-9ee0-96dfdde4709ca',
    };

    service.updateUser(mock1).subscribe((res: any) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(environment.usersEndpoint);
    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockResponse);
  });

  it('should DELETE user data', () => {
    const mock1: User = {
      userId: 1,
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.commmm',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
      userToken: 'e455fdfc3-e86f-4833-9ee0-96dfdde4709ca',
    };
    const mockResponse = 'User with ID: 199 was deleted.';

    service.deleteUser(mock1).subscribe((res: any) => {
      expect(res).toBe(mockResponse);
    });

    const req = httpTestingController.expectOne(
      environment.authEndpoint + '/' + mock1.userId
    );
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockResponse);
  });

  it('should POST to the correct endpoint', () => {
    const mockDto: CreateUser = {
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.com',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
    };

    const mockResponse: User = {
      userId: 1,
      userFirstName: 'Tural',
      userLastName: 'Hasanli',
      userEmail: 'tural.hasanli@test.com',
      userPassword: 'Smoothstack2021',
      userPhone: '8880008800',
      userRole: Role.USER,
      userToken: 'e45529c3-e86f-4833-9ee0-9640de4709ca',
    };

    service.createUser(mockDto).subscribe((res: any) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(environment.authEndpoint);
    expect(req.request.method).toBe('POST');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockResponse);
  });
});
