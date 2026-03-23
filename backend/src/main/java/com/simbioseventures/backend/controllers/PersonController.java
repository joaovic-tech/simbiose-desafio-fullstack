package com.simbioseventures.backend.controllers;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.dtos.UpdatePersonDTO;
import com.simbioseventures.backend.services.PersonService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @GetMapping("/pessoa/{id}")
  public PersonResponseDTO getPerson(@PathVariable Long id) {
    PersonResponseDTO person = personService.findById(id);
    return person;
  }

  @PutMapping("/pessoa/{id}")
  public PersonResponseDTO updatePerson(@PathVariable Long id, @RequestBody @Valid UpdatePersonDTO updatePersonDTO) {
    return personService.updatePerson(id, updatePersonDTO);
  }

  @DeleteMapping("/pessoa/{id}")
  public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
    personService.deletePerson(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/pessoas")
  public List<PersonResponseDTO> findAll() {
    return personService.findAll();
  }
}
