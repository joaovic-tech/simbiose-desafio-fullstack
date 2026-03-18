package com.simbioseventures.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/status")
public class StatusController {

    @GetMapping()
    public ResponseEntity<String> checkStatus() {
        return ResponseEntity.ok("OK");
    }

}
