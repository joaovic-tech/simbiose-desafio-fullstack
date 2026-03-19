package com.simbioseventures.backend.dtos;

import com.simbioseventures.backend.entities.PersonEntity;

import java.time.LocalDate;


public record PersonResponseDTO(
        Long id,
        String name,
        String email,
        LocalDate birthDate) {
    public PersonResponseDTO(PersonEntity person) {
        this(person.getId(), person.getName(), person.getEmail(), person.getBirthDate());
    }
}
