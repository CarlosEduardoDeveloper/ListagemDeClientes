import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Clientes from 'src/app/models/Clientes';

@Component({
  selector: 'app-clientes-dialog',
  templateUrl: './clientes-dialog.component.html',
  styleUrls: ['./clientes-dialog.component.scss']
})
export class ClientesDialogComponent implements OnInit {
  isChange!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ClientesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Clientes,

  ) {

  }

  ngOnInit(): void {
    if (this.data.id != '') {
      this.isChange = true;
    } else {
      this.isChange = false;
    }

  }

  onCancel() {
    this.dialogRef.close();
  }


}
