import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

export interface User {
  position: number;
  id: number;
  name: string;
  role: string;
  lateCount: number;
}

const USER_DATA: User[] = [
  {position: 1, id: 36, name: 'Иван', role: 'Строитель', lateCount: 21},
  {position: 2, id: 21, name: 'Илья', role: 'Строитель', lateCount: 14},
  {position: 3, id: 22, name: 'Максим', role: 'Строитель', lateCount: 12},
  {position: 4, id: 42, name: 'Алексей', role: 'Строитель', lateCount: 11},
  {position: 5, id: 43, name: 'Артур', role: 'Бригадир', lateCount: 11},
  {position: 6, id: 32, name: 'Игорь', role: 'Бригадир', lateCount: 9},
  {position: 7, id: 11, name: 'Никита', role: 'Бригадир', lateCount: 8},
  {position: 8, id: 12, name: 'Кристина', role: 'Начальник участка', lateCount: 7},
  {position: 9, id: 10, name: 'Маша', role: 'Оператор', lateCount: 7},
  {position: 10, id: 3, name: 'Анастасия', role: 'Диспетчер', lateCount: 7},
  {position: 11, id: 2, name: 'Жанна', role:'Оператор', lateCount: 7},
  {position: 12, id: 7, name: 'Наталья', role: 'Диспетчер', lateCount: 4},
  {position: 13, id: 8, name: 'Серафима', role: 'Диспетчер', lateCount: 4},
  {position: 14, id: 9, name: 'Григорий', role: 'Оператор', lateCount: 3},
  {position: 15, id: 5, name: 'Степан', role: 'Строитель', lateCount: 2},
  {position: 16, id: 4, name: 'Николай', role: 'Оператор', lateCount: 2},
  {position: 17, id: 1, name: 'Дмитрий', role: 'Диспетчер', lateCount: 2},
];

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent {
  displayedColumns: string[] = ['position', 'id', 'name', 'role', 'lateCount'];
  dataSource = USER_DATA;
}
