package com.example.account.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.account.domain.Conta;

@Repository
public interface AccountRepository extends CrudRepository<Conta, String> {

	Conta findByNome(String name);

}
