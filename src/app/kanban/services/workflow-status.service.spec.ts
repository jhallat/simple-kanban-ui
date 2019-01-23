import { TestBed } from '@angular/core/testing';

import { WorkflowStatusService } from './workflow-status.service';

describe('WorkflowStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStatusService = TestBed.get(WorkflowStatusService);
    expect(service).toBeTruthy();
  });
});
