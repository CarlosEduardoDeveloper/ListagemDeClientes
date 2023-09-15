package com.br.listagem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.listagem.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
