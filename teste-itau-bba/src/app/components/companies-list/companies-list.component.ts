import { AfterViewInit, Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IBusinessModel } from 'src/app/shared/models/itauB.model';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.sass']
})
export class CompaniesListComponent implements AfterViewInit {

  @Input() dataSource = new MatTableDataSource<IBusinessModel>([]);
  @Output() filterSearch: EventEmitter<string> = new EventEmitter();

  /*Array da tabela */
  displayedColumns = ['name', 'business', 'valuation', 'active', 'action'];
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IBusinessModel>;

  constructor(
    formBuilder: FormBuilder) {
      this.form = formBuilder.group({
        search: ['']
      });
    }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  filter(): void {
    this.filterSearch.emit(this.form.controls.search.value);
  }

}
