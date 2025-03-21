package com.curso.mvc.controller;

import com.curso.mvc.entities.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import  com.curso.mvc.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Pedidos", description = "Operaciones relacionadas con pedidos")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @Operation(summary = "Listar pedidos", description = "Obtiene una lista de todos los pedidos.")
    @ApiResponse(responseCode = "200", description = "Lista de pedidos obtenida correctamente.")
    public List<Order> listOrders(Model model) {
        return orderService.getAllOrders();
    }

    @PostMapping
    @Operation(summary = "Crear pedido", description = "Crea un nuevo pedido.")
    @ApiResponse(responseCode = "302", description = "Pedido creado correctamente.")
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
}