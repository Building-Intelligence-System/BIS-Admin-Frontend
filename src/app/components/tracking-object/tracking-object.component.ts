import {AfterViewInit,
  ChangeDetectorRef,
  Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import Chart from 'chart.js/auto';

export interface TrackingObject {
  position: number;
  id: number;
  name: string;
  type: string;
  outage: string;
}

const TRACKING_OBJECT_DATA: TrackingObject[] = [
  {position: 1, id: 36, name: 'C 202 CВ', type: 'Трактор', outage: '7ч 18мин'},
  {position: 2, id: 21, name: 'Л 206 СВ', type: 'Грузовик', outage: '6ч 51мин'},
  {position: 3, id: 22, name: 'С 021 ВМ', type: 'Бульдозер', outage: '6ч 9мин'},
  {position: 4, id: 42, name: 'В 288 ММ', type: 'Кран', outage: '5ч 53мин'},
  {position: 5, id: 43, name: 'В 564 МУ', type: 'Трактор', outage: '5ч 22мин'},
  {position: 6, id: 32, name: 'М 822 УС', type: 'Бульдозер', outage: '4ч 1мин'},
  {position: 7, id: 11, name: 'Т 277 ВВ', type: 'Грузовик', outage: '3ч 44мин'},
  {position: 8, id: 12, name: 'И 513 КК', type: 'Трактор', outage: '3ч 11мин'},
  {position: 9, id: 10, name: 'М 531 ПК', type: 'Кран', outage: '2ч 24мин'},
  {position: 10, id: 3, name: 'М 451 СП', type: 'Бульдозер', outage: '2ч 21мин'},
  {position: 11, id: 2, name: 'У 624 КР', type: 'Трактор', outage: '1ч 59мин'},
  {position: 12, id: 7, name: 'С 416 РК', type: 'Грузовик', outage: '1ч 41мин'},
  {position: 13, id: 8, name: 'А 436 РС', type: 'Кран', outage: '1ч 29мин'},
  {position: 14, id: 9, name: 'В 745 ПА', type: 'Мусоровоз', outage: '1ч 28мин'},
  {position: 15, id: 5, name: 'В 374 АА', type: 'Трактор', outage: '1ч 18мин '},
  {position: 16, id: 4, name: 'П 542 РА', type: 'Бульдозер', outage: '38мин'},
  {position: 17, id: 1, name: 'А 122 РС', type: 'Грузовик', outage: '18мин'},
];

@Component({
  selector: 'app-tracking-object',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './tracking-object.component.html',
  styleUrl: './tracking-object.component.scss'
})
export class TrackingObjectComponent implements  AfterViewInit {
  displayedColumns: string[] = ['position', 'id', 'name', 'type', 'outage'];
  dataSource = TRACKING_OBJECT_DATA;
  doughnutChart: any;
  barChart: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

ngAfterViewInit() {
   this.doughnutChart = new Chart("doughnutChart", {
      type: 'doughnut',
      data: {
        labels: ["Грузовик", "Бульдозер", "Трактор", "Мусоровоз", "Кран"],
        datasets: [
          {
            label: "Простой (минутах)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [754,789,1148,88,586]
          }
        ]
      },
     options: {
         maintainAspectRatio: false,
     }
    });
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['2022-06-9', '2022-06-10', '2022-06-11', '2022-06-12','2022-06-13',
          '2022-06-14', '2022-06-15', '2022-06-16' ],
        datasets: [{
          label: 'Время простоя транспортного средства',
          data: [34, 65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      }    ,
      options: {
        maintainAspectRatio: false,
      }
    });
    this.changeDetectorRef.markForCheck();
  }
}
