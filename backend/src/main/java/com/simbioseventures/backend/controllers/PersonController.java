package com.simbioseventures.backend.controllers;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.services.PersonService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/pessoa")
    public ResponseEntity<PersonResponseDTO> createPerson(@RequestBody @Valid CreatePersonDTO createPersonDTO) {
        PersonResponseDTO savedPerson = personService.createPerson(createPersonDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
    }
}
