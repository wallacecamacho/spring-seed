package com.example.account.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.esotericsoftware.kryo.NotNull;

@Document(collection = "contas")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Conta {

	@Id
	@NotNull
	private String nome;

	
	private Double limite;
	
	@Length(min = 0, max = 20_000)
	private String risco;
	
	private Double taxa;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Double getLimite() {
		return limite;
	}

	public void setLimite(Double limite) {
		this.limite = limite;
	}

	public String getRisco() {
		return risco;
	}

	public void setRisco(String risco) {
		this.risco = risco;
	}

	public Double getTaxa() {
		return taxa;
	}

	public void setTaxa(Double taxa) {
		this.taxa = taxa;
	}

	


}
