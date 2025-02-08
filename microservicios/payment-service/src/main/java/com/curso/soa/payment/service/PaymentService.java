package com.curso.soa.payment.service;

import com.curso.soa.payment.entity.Pago;
import com.curso.soa.payment.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PagoRepository pagoRepository;

    public Pago procesarPago(Pago pago) {
        pago.setEstado("Procesado");
        return pagoRepository.save(pago);
    }
}