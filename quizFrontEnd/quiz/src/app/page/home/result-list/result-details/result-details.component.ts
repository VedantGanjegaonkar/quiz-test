import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/core/services/result.service';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.css']
})
export class ResultDetailsComponent implements OnInit {

  attemptId: string | null = null;
  details: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) { }

  ngOnInit(): void {
    this.attemptId = this.route.snapshot.paramMap.get('id');
    if (this.attemptId) {
      this.loadDetails(this.attemptId);
    }
  }

  loadDetails(id: string) {
    this.resultService.getAttepmtDetail(id).subscribe((data: any) => {
      this.details = data;
      console.log("Details", data);
    });
  }
}
