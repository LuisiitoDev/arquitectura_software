package com.curso.mvc.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static <T> ResponseEntity<Map<String, Object>> generateResponse(String message, HttpStatus status, T responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("code", status.value());
        map.put("status", status.name());
        map.put("data", responseObj);
        return new ResponseEntity<>(map, status);
    }
}