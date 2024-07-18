import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/core/services/result.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  constructor(private resultService:ResultService,private router:Router){}

  attempts:any[]=[]

ngOnInit(): void {
  this.loadAttempts()
}

loadAttempts(){
  this.resultService.getAttepmts().subscribe((data:any)=>{
    this.attempts=data
    console.log("data",data);
    
  })
}
viewDetails(id: string) {
  this.router.navigate(['/attempt-details', id]);
}

}
