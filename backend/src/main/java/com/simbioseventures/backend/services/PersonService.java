package com.simbioseventures.backend.services;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.entities.PersonEntity;
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
}
