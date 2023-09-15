package com.br.listagem.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ClienteDTO {
    private Long id;
    private String nome;
    private String sobrenome;
    private String email;
    private String telefone;
}
