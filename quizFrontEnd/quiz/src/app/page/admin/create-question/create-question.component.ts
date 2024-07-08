import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswer: ['', Validators.required],
      explanation: ['', Validators.required],
      points: [1, [Validators.required, Validators.min(1)]],
      difficulty: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  onSubmit() {
    if (this.questionForm.valid) {
      this.http.post('http://localhost:3000/que/create', this.questionForm.value)
        .subscribe(
          (response) => {
            console.log('Question created successfully', response);
            this.questionForm.reset();
          },
          (error) => {
            console.error('Error creating question', error);
          }
        );
    }
  }
}
