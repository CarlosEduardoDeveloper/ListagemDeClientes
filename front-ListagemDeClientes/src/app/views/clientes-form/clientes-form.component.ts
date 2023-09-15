import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Clientes from 'src/app/models/Clientes';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ClientesDialogComponent } from 'src/app/shared/clientes-dialog/clientes-dialog.component';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
  providers: [ClienteService]
})
export class ClientesFormComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  clients: Clientes[] = [];
  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'email', 'telefone', 'acoes'];
  formClientes: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.formClientes = this.formBuilder.group({
      id: [''],
      nome: [''],
      sobrenome: [''],
      email: [''],
      telefone: ['']
    })
    this.clienteService.getAllClientes()
      .subscribe(data => {
        this.clients = data
      });
  }

  ngOnInit(): void {
    const clientes: Clientes = this.route.snapshot.data['clientes'];
    this.formClientes.setValue({
      id: [''],
      nome: [''],
      sobrenome: [''],
      email: [''],
      telefone: ['']
    })
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

  openDialog(cliente: Clientes | null) {
    const dialogRef = this.dialog.open(ClientesDialogComponent, {
      width: '250px',
      data: cliente != null ?
        cliente : {
          id: 0,
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
              location.reload();
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

  /*   private onSuccess() {
      this.snackBar.open('Atividade salva com sucesso!', '', { duration: 5000 });
      this.onCancel();
    }

    private onError() {
      this.snackBar.open('Erro ao salvar atividade.', '', { duration: 5000 });
    } */

}
