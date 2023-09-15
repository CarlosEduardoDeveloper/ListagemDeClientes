package com.br.listagem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cliente")
public class Cliente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;
	
	@Column(name = "nome", length = 60, nullable = false)
	@NotNull
	@NotEmpty
	@Size(min = 2, max = 60)
	private String nome;
	
	@Column(name = "sobrenome", length = 60, nullable = false)
	@Size(min = 2, max = 60)
	private String sobrenome;
	
	@Column(name = "email", length = 60, nullable = false)
	@NotNull
	@NotEmpty
	@Email
	private String email;
	
	@Column(name = "telefone", length = 14, nullable = false)
	@Size(min = 10, max = 14)
	private String telefone;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null)
			return false;
		if (getClass() != o.getClass())
			return false;
		Cliente other = (Cliente) o;
		return Objects.equals(email, other.email) && Objects.equals(id, other.id) && Objects.equals(nome, other.nome)
				&& Objects.equals(sobrenome, other.sobrenome) && Objects.equals(telefone, other.telefone);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(email, id, nome, sobrenome, telefone);
	}
	
	
	
	


}
