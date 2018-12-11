package com.example.account.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.account.domain.Conta;
import com.example.account.service.AccountService;

@RestController
public class AccountController {

	@Autowired
	private AccountService accountService;

	@RequestMapping(path = "/contas", method = RequestMethod.GET)
	public Iterable<Conta> listContas() {
		return accountService.listAll();
	}
	
	@RequestMapping(path = "/contas", method = RequestMethod.POST)
	public Conta createNewAccount(@Valid @RequestBody Conta conta) {
		return accountService.create(conta);
	}
	
	@RequestMapping(path = "/contas", method = RequestMethod.PUT)
	public void saveCurrentAccount(@Valid @RequestBody Conta account) {
		accountService.saveChanges(account);
	}
}
