package com.example.account.service;


import com.example.account.domain.Conta;

public interface AccountService {
	
	/**
	 * List all contas
	 *
	 * @param accountName
	 * @return found account
	 */
	Iterable<Conta> listAll();

	/**
	 * Finds conta by given name
	 *
	 * @param accountName
	 * @return found account
	 */
	Conta findByName(String accountName);
	
	/**
	 * Checks if conta with the same name already exists
	 * Creates new conta with default parameters
	 *
	 * @param account
	 * @return created account
	 */
	Conta create(Conta contas);

	/**
	 * Validates and applies incoming account updates
	 *
	 * @param update
	 */
	void saveChanges(Conta update);

}
