import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Clientes from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteApiUrl = 'http://localhost:8080/cliente'
  private readonly APIDELETE = 'http://localhost:8080/cliente/excluir';
  private readonly APIATUALIZA = 'http://localhost:8080/cliente/atualizar';
  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.clienteApiUrl);
  }

  createCliente(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(this.clienteApiUrl, {
      nome: cliente.nome,
      sobrenome: cliente.sobrenome,
      email: cliente.email,
      telefone: cliente.telefone
    });
  }

  updateCliente(cliente: Clientes, id: string): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.APIATUALIZA}/${id}`, cliente);
  }

  deleteClientes(id: string) {
    return this.http.delete(`${this.APIDELETE}/${id}`);
  }
}
