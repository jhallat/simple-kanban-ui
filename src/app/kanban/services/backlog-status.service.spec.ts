import { TestBed } from '@angular/core/testing';

import { BacklogStatusService } from './backlog-status.service';

describe('BacklogStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BacklogStatusService = TestBed.get(BacklogStatusService);
    expect(service).toBeTruthy();
  });
});
