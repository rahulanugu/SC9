import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RequestaccessnewuserService } from './requestaccessnewuser.service';

describe('RequestaccessnewuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule,
      RouterModule.forRoot([]),
    ]
  }));

  it('should be created', () => {
    const service: RequestaccessnewuserService = TestBed.get(RequestaccessnewuserService);
    expect(service).toBeTruthy();
  });
});
