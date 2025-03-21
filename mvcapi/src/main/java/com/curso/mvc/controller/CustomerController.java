package com.curso.mvc.controller;
import com.curso.mvc.dto.CustomerDTO;
import com.curso.mvc.entities.Customer;
import com.curso.mvc.entities.Customer;
import  com.curso.mvc.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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



    @Operation(summary = "Devuelve la lista de Clientes", description = "Devuelve la lista de Clientes", operationId = "get", tags = {"get, customers" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Devuelve la lista de Clientes"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "Forbidden"),
            @ApiResponse(responseCode = "404", description = "Not found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")})
    @GetMapping
    public List<Customer> listCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        //return customerService.saveCustomer(CustomerDTO.toCustomerEntity(customer));
        return customerService.saveCustomer(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer Customer) {
        Customer.setId(id);
        return customerService.saveCustomer(Customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}