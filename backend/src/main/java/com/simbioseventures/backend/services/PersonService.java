package com.simbioseventures.backend.services;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.dtos.UpdatepersonDTO;
import com.simbioseventures.backend.entities.PersonEntity;
import com.simbioseventures.backend.exceptions.PersonNotFoundException;
import com.simbioseventures.backend.repositories.PersonRepository;

import org.springframework.stereotype.Service;

@Service
public class PersonService {

  private final PersonRepository personRepository;

  public PersonService(PersonRepository personRepository) {
      this.personRepository = personRepository;
  }

  public PersonResponseDTO createPerson(CreatePersonDTO dto) {
      if (personRepository.existsByEmail(dto.email())) {
          throw new IllegalArgumentException("E-mail already registered");
      }
      PersonEntity person = new PersonEntity();
      person.setName(dto.name());
      person.setEmail(dto.email());
      person.setBirthDate(dto.birthDate());
      person = personRepository.save(person);

      return new PersonResponseDTO(person);
  }

  public PersonResponseDTO findById(Long id) {
    PersonEntity person = personRepository.findById(id)
        .orElseThrow(() -> new PersonNotFoundException(id));
    return new PersonResponseDTO(person);
  }

  public PersonResponseDTO updatePerson(Long id, UpdatepersonDTO data) {
    PersonEntity person = personRepository.findById(id)
        .orElseThrow(() -> new PersonNotFoundException(id));

    person.setName(data.name());
    person.setEmail(data.email());
    person.setBirthDate(data.birthDate());
    person = personRepository.save(person);

    return new PersonResponseDTO(person);
  }

  public void deletePerson(Long id) {
    if (!personRepository.existsById(id)) {
      throw new PersonNotFoundException(id);
    }
    personRepository.deleteById(id);
  }

}
