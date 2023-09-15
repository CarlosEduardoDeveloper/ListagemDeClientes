package com.br.listagem.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.listagem.model.Cliente;
import com.br.listagem.repository.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	public List <Cliente> listAll() {
		return clienteRepository.findAll();
	}
	
	public Cliente findById(Long id) {
		Optional<Cliente> cliente = this.clienteRepository.findById(id);
		return cliente.orElseThrow( () -> new RuntimeException(
				"Cliente não encontrado! Id: " + id
 				));
	}
	
	@Transactional
	public Cliente create(Cliente cliente) {
		cliente.setId(null);
		cliente = this.clienteRepository.save(cliente);
		return cliente;
	}
	
	@Transactional
	public Cliente update(Long id, Cliente cliente) {
		Cliente novoCliente = findById(cliente.getId());
		novoCliente.setEmail(cliente.getEmail());
		novoCliente.setNome(cliente.getNome());
		novoCliente.setSobrenome(cliente.getSobrenome());
		novoCliente.setTelefone(cliente.getTelefone());
		return this.clienteRepository.save(novoCliente);
	}
	
	public void delete(Long id) {
		findById(id);
		try {
			this.clienteRepository.deleteById(id);
		} catch (Exception e) {
			throw new RuntimeException("Não é possível deletar o cliente, "
					+ "pois há entidades relacionadas!");
		}
	}

}
