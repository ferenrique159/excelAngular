import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from 'xlsx';
import { CdkDragDrop, moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-lista-predyc',
  templateUrl: './lista-predyc.component.html'
})
export class ListaPredycComponent{

  // Variables
  CategoriaElectronic : any;
  CategoriaElectr : any;
  CategoriaHerramientas : any;
  ExcelData : any = [];
  dataSource = new MatTableDataSource(this.ExcelData);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'type'];


  constructor(){
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log({filterValue})
    console.log(this.dataSource)
  }

  ReadExcel(event:any){

    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {

      let workBook = XLSX.read( fileReader.result, {type: 'binary'} );
      let sheetNames = workBook.SheetNames;

      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.CategoriaElectronic = this.ExcelData[0].categoria;
      this.CategoriaElectr = this.ExcelData[3].categoria;
      this.CategoriaHerramientas = this.ExcelData[4].categoria
    }
  }

  drop($event : CdkDragDrop<any[]>  ){
    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }else{
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }

  }
}

