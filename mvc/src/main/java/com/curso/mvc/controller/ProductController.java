package com.curso.mvc.controller;


import com.curso.mvc.entities.Product;
import com.curso.mvc.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Productos", description = "Operaciones relacionadas con productos")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    @Operation(summary = "Listar productos", description = "Obtiene una lista de todos los productos.")
    @ApiResponse(responseCode = "200", description = "Lista de productos obtenida correctamente.")
    public List<Product> listProducts() {
        return productService.getAllProducts();
    }
    @PostMapping
    @Operation(summary = "Crear producto", description = "Crea un nuevo producto.")
    @ApiResponse(responseCode = "302", description = "Producto creado correctamente.")
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }
}