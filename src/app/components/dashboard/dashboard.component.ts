import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  view: any[] = []
  colorScheme = "cool"
  tema: string = ""

  data: any[]= [
    {
      "name": 'Niños',
      "series": [
        {
          "name": "enero",
          "value": 250
        },
        {
          "name": "febrero",
          "value": 54      
        },
        {
          "name": "marzo",
          "value": 124
        },
        {
          "name": "abril",
          "value": 11
        }
      ]
    },
    {
      "name": 'Adolescentes',
      "series": [
        {
          "name": "enero",
          "value": 54
        },
        {
          "name": "febrero",
          "value": 180
        },
        {
          "name": "marzo",
          "value": 23
        },
        {
          "name": "abril",
          "value": 11
        }
      ]
    },
    {
      "name": 'Adultos',
      "series": [
        {
          "name": "enero",
          "value": 54
        },
        {
          "name": "febrero",
          "value": 32
        },
        {
          "name": "marzo",
          "value": 80
        },
        {
          "name": "abril",
          "value": 11
        }
      ]
    },
    {
      "name": 'Adultos mayores',
      "series": [
        {
          "name": "enero",
          "value": 19
        },
        {
          "name": "febrero",
          "value": 43
        },
        {
          "name": "marzo",
          "value": 26
        },
        {
          "name": "abril",
          "value": 11
        }
      ]
    }
  ]

  pieData:any[]=
  [
    {
      "name": "Niños",
      "value": 89
    },
    {
      "name": "Adolescentes",
      "value": 53
    },
    {
      "name": "Adultos",
      "value": 15
    },
    {
      "name": "Adultos mayores",
      "value": 38
    }
  ];
  
  cardData:any[]=
  [
    {
      "name": "Niños",
      "value": 10
    },
    {
      "name": "Adolescentes",
      "value": 5
    },
    {
      "name": "Adultos",
      "value": 15
    },
    {
      "name": "Adultos Mayores",
      "value": 2
    }
  ];

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.theme.subscribe(rsp=>{
      if(rsp) this.tema="dark"
      else this.tema = ""
    })
  }

  ngAfterViewInit(){
  }

  onResize(event){
    console.log("W "+event.target.innerWidth);
    console.log("H "+event.target.innerHeight);
    this.view=[event.target.innerWidth / 1.35, event.target.innerHeight / 3]
  }

  onSelect(event){
    console.log(event);
  }

}
