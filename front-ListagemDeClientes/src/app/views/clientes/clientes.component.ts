import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import Clientes from 'src/app/models/Clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClientesDialogComponent } from 'src/app/shared/clientes-dialog/clientes-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  clients: Clientes[] = [];
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'email', 'telefone', 'acoes'];

  constructor(
    public dialog: MatDialog,
    public clienteService: ClienteService
  ) {
    this.clienteService.getAllClientes()
      .subscribe(data => {
        this.clients = data
      });
  }

  ngOnInit(): void {

  }


  openDialog(cliente: Clientes | null) {
    const dialogRef = this.dialog.open(ClientesDialogComponent, {
      width: '250px',
      data: cliente != null ?
        cliente : {
          id: '',
          nome: '',
          sobrenome: '',
          email: '',
          telefone: ''
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.clients.map(p => p.id).includes(result.id)) {
          this.clienteService.updateCliente(result, result.id)
            .subscribe(data => {
              const index = this.clients.findIndex(p => p.id === data.id);
              console.log(index);
              this.clients[index] = data;
              this.table.renderRows();
              //location.reload();
            })
        } else {
          this.clienteService.createCliente(result)
            .subscribe(data => {
              this.clients.push(data);
              location.reload();
            })
        }

      }
    });
  }

  updateCliente(cliente: Clientes) {
    this.openDialog(cliente);
  }

  deleteCliente(id: string) {
    this.clienteService.deleteClientes(id)
      .subscribe(() => {
        this.clients = this.clients.filter(p => p.id != id);
      })
    location.reload();
  }

}
