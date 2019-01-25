import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BacklogStatusService } from './backlog-status.service';

describe('BacklogStatusService', () => {
  let service: BacklogStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BacklogStatusService
      ]
    });

    service = TestBed.get(BacklogStatusService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should return a list of backlog statuses', (done) => {
    service.getBacklogStatuses()
      .subscribe(res => {
        expect(res).toEqual(
          [
            {id: 1, code: 'active', description: 'Active'},
            {id: 2, code: 'cancelled', description: 'Cancelled'}
          ]
        );
        done();
      });

      const statusRequest = httpMock.expectOne('http://localhost:8080/api/v1/backlog-statuses');
      statusRequest.flush([
        {id: 1, code: 'active', description: 'Active'},
        {id: 2, code: 'cancelled', description: 'Cancelled'}
      ]);

      httpMock.verify();
  });

  it ('should return an error if request failed', (done) => {
    service.getBacklogStatuses()
      .subscribe(resp => {}, err => {
        expect(err.status).toBe(404);
        expect(err.statusText).toBe('Not found');
        done();
      });
    const statusRequest = httpMock.expectOne('http://localhost:8080/api/v1/backlog-statuses');
    statusRequest.error(new ErrorEvent(''), {status: 404, statusText: 'Not found'});

    httpMock.verify();
  });

});
