import { TestBed } from '@angular/core/testing';

import { LoggerFactoryService } from './logger-factory.service';

describe('LoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerFactoryService = TestBed.get(LoggerFactoryService);
    expect(service).toBeTruthy();
  });
});
