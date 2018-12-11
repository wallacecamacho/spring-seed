package com.example.account.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.example.account.domain.Conta;
import com.example.account.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

	private final Logger log = LoggerFactory.getLogger(getClass());


	@Autowired
	private AccountRepository repository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Conta findByName(String accountName) {
		Assert.hasLength(accountName);
		return repository.findByNome(accountName);
	}
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public Iterable<Conta> listAll() {
		return repository.findAll();
	}


	/**
	 * {@inheritDoc}
	 */
	@Override
	public Conta create(Conta account) {

		Conta existing = repository.findByNome(account.getNome());
		Assert.isNull(existing, "account already exists: " + account.getNome());

		repository.save(account);

		log.info("new account has been created: " + account.getNome());

		return account;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void saveChanges(Conta update) {

		Conta account = repository.findByNome(update.getNome());
		Assert.notNull(account, "can't find account with name " + update.getNome());

		account.setLimite(update.getLimite());
		account.setNome(update.getNome());
		account.setRisco(update.getRisco());
		account.setTaxa(update.getTaxa());
		
		repository.save(account);

		log.debug("account {} changes has been saved", update.getNome());
	}
}

