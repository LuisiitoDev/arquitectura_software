package com.curso.mvc.dto;

import com.curso.mvc.entities.Customer;
import lombok.Data;

@Data
public class CustomerDTO {
    private String nombre;
    private String correo;


    public static Customer toCustomerEntity(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setName(customerDTO.getNombre());
        customer.setEmail(customerDTO.getCorreo());
        return customer;
    }

}
