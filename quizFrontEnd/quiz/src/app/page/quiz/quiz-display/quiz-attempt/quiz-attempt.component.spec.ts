import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAttemptComponent } from './quiz-attempt.component';

describe('QuizAttemptComponent', () => {
  let component: QuizAttemptComponent;
  let fixture: ComponentFixture<QuizAttemptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizAttemptComponent]
    });
    fixture = TestBed.createComponent(QuizAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
