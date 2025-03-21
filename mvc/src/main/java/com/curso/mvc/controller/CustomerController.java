package com.curso.mvc.controller;
import com.curso.mvc.entities.Customer;
import  com.curso.mvc.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@Tag(name = "Clientes", description = "Operaciones relacionadas con clientes")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping
    @Operation(summary = "Listar clientes", description = "Obtiene una lista de todos los clientes.")
    @ApiResponse(responseCode = "200", description = "Lista de clientes obtenida correctamente.")
    public List<Customer> listCustomers(Model model) {
        return customerService.getAllCustomers();
    }

    @PostMapping
    @Operation(summary = "Crear cliente", description = "Crea un nuevo cliente.")
    @ApiResponse(responseCode = "302", description = "Cliente creado correctamente.")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }
}