package com.br.listagem.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.br.listagem.model.dto.ClienteDTO;
import com.br.listagem.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.br.listagem.model.Cliente;
import com.br.listagem.service.ClienteService;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private ClienteService clienteService;
	
	@GetMapping
	public ResponseEntity<List<ClienteDTO>> findAll(){
		return ResponseEntity.ok(clienteRepository.findAll().stream().map(dto -> ClienteDTO.builder()
				.id(dto.getId())
				.nome(dto.getNome())
				.sobrenome(dto.getSobrenome())
				.email(dto.getEmail())
				.telefone(dto.getTelefone())
				.build()).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cliente> findById(@PathVariable Long id) {
		try{
			Optional<Cliente> cliente = clienteRepository.findById(id);
			return cliente.isPresent()? ResponseEntity.ok(cliente.get()) : ResponseEntity.notFound().build();
		} catch (Exception e){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping
	public ResponseEntity<Void> create(@RequestBody Cliente cliente){
		try{
			this.clienteService.create(cliente);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
					.path("/{id}").buildAndExpand(cliente.getId()).toUri();
		return ResponseEntity.created(uri).build();
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
	
	@PutMapping(value = "atualizar/{id}")
	@ResponseBody
	public ResponseEntity<Cliente> update(@PathVariable Long id, @RequestBody Cliente cliente){
		try{
			Cliente clienteAtualizado = clienteService.update(id, cliente);
			return ResponseEntity.ok(clienteAtualizado);
		} catch(Exception e){
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
	}
	
	@DeleteMapping(value = "excluir/{id}")
	@ResponseBody
	public ResponseEntity<String> delete(@PathVariable Long id){
		try {
			this.clienteService.delete(id);
			return new ResponseEntity<String>("Cliente deletado com sucesso", HttpStatus.OK);
		} catch (Exception e){
			return ResponseEntity.notFound().build();
		}
		}

}
