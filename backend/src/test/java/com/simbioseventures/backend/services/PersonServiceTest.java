package com.simbioseventures.backend.services;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.entities.PersonEntity;
import com.simbioseventures.backend.repositories.PersonRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDate;


import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private PersonService personService;

    private PersonEntity createPersonEntity(String name, String email, LocalDate birthDate) {
        PersonEntity personEntity = new PersonEntity();
        personEntity.setId(1L);
        personEntity.setName(name);
        personEntity.setEmail(email);
        personEntity.setBirthDate(birthDate);
        return personEntity;
    }

    @Test
    @DisplayName("Should create a new person successfully")
    void createPerson() {
        // Arrange (Preparação)
        CreatePersonDTO data = new CreatePersonDTO("test", "test@user.com", LocalDate.now());
        PersonEntity mockedSavedEntity = createPersonEntity("test", "test@user.com", LocalDate.of(2023, 1, 1));

        when(personRepository.existsByEmail(data.email())).thenReturn(false);
        when(personRepository.save(any(PersonEntity.class))).thenReturn(mockedSavedEntity);

        // Act (Ação)
        PersonResponseDTO result = personService.createPerson(data);

        // Assert (Verificação)
        assertNotNull(result);
        assertEquals(mockedSavedEntity.getEmail(), result.email());
        assertEquals(mockedSavedEntity.getName(), result.name());
        assertInstanceOf(PersonResponseDTO.class, result);
    }

    @Test
    @DisplayName("Should throw exception when e-mail already exists")
    void createPersonWithDuplicateEmail() {
        // Arrange
        CreatePersonDTO data = new CreatePersonDTO("test", "test@user.com", LocalDate.now());

        when(personRepository.existsByEmail(data.email())).thenReturn(true);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> personService.createPerson(data)
        );

        assertEquals("E-mail already registered", exception.getMessage());
        verify(personRepository, times(0)).save(any(PersonEntity.class));
    }

}