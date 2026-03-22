package com.simbioseventures.backend.services;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.dtos.UpdatePersonDTO;
import com.simbioseventures.backend.entities.PersonEntity;
import com.simbioseventures.backend.repositories.PersonRepository;

import com.simbioseventures.backend.exceptions.PersonNotFoundException;
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
import static org.mockito.ArgumentMatchers.anyLong;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private PersonService personService;

    private PersonEntity createPersonEntity(Long id, String name, String email, LocalDate birthDate) {
        PersonEntity personEntity = new PersonEntity();
        personEntity.setId(id);
        personEntity.setName(name);
        personEntity.setEmail(email);
        personEntity.setBirthDate(birthDate);
        return personEntity;
    }

    @Test
    @DisplayName("Should create a new person successfully")
    void createPerson() {
        CreatePersonDTO data = new CreatePersonDTO("test", "test@user.com", LocalDate.now());
        PersonEntity savedPerson = createPersonEntity(1L, "test", "test@user.com", LocalDate.of(2023, 1, 1));

        when(personRepository.existsByEmail(data.email())).thenReturn(false);
        when(personRepository.save(any(PersonEntity.class))).thenReturn(savedPerson);

        PersonResponseDTO result = personService.createPerson(data);

        assertNotNull(result);
        assertEquals(savedPerson.getEmail(), result.email());
        assertEquals(savedPerson.getName(), result.name());
        assertInstanceOf(PersonResponseDTO.class, result);
    }

    @Test
    @DisplayName("Should throw exception when e-mail already exists")
    void createPersonWithDuplicateEmail() {
        CreatePersonDTO data = new CreatePersonDTO("test", "test@user.com", LocalDate.now());

        when(personRepository.existsByEmail(data.email())).thenReturn(true);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> personService.createPerson(data)
        );

        assertEquals("E-mail already registered", exception.getMessage());
        verify(personRepository, times(0)).save(any(PersonEntity.class));
    }

    @Test
    @DisplayName("Should return a list of persons")
    void findAll() {
      PersonEntity person1 = createPersonEntity(1L, "Person 1", "person1@mail.com", LocalDate.of(2022, 2, 2));
      PersonEntity person2 = createPersonEntity(2L, "Person 2", "person2@mail.com", LocalDate.of(2000, 2, 2));
      List<PersonEntity> listPersonEntity = List.of(person1, person2);      

      when(personRepository.findAll()).thenReturn(listPersonEntity);
      
      List<PersonResponseDTO> result = personService.findAll();

      assertNotNull(result);
      assertEquals(result.size(), 2);
      assertEquals(person1.getBirthDate(), result.getFirst().birthDate());
      assertInstanceOf(PersonResponseDTO.class, result.getFirst());
    }

    @Test
    @DisplayName("Should return an empty list when no persons found")
    void findAllEmpty() {
      when(personRepository.findAll()).thenReturn(List.of());

      List<PersonResponseDTO> result = personService.findAll();

      assertNotNull(result);
      assertEquals(0, result.size());
    }

    @Test
    @DisplayName("Should find person by id")
    void findById() {
      // TODO: ATIKA - Instrução:
      // 1. Mockar um ID e uma PersonEntity.
      PersonEntity person = createPersonEntity(1L, "name", "email", LocalDate.of(2000, 2, 2));

      when(personRepository.findById(person.getId())).thenReturn(Optional.of(person));

      PersonResponseDTO result = personService.findById(person.getId());

      assertNotNull(result);
      assertEquals(result.name(), person.getName());
      assertEquals(result.email(), person.getEmail());
      assertEquals(result.birthDate(), person.getBirthDate());
      assertInstanceOf(PersonResponseDTO.class, result);
    }

    @Test
    @DisplayName("Should throw PersonNotFoundException when id does not exist")
    void findByIdNotFound() {
      // TODO: ATIKA - Instrução:
      // 1. Mockar personRepository.findById(anyLong()) retornando Optional.empty().
      when(personRepository.findById(anyLong())).thenReturn(Optional.empty());
      // 2. Assert: assertThrows(PersonNotFoundException.class, () -> personService.findById(1L)).
      assertThrows(
        PersonNotFoundException.class,
        () -> personService.findById(1L)
      );
    }

    @Test
    @DisplayName("Should update person successfully")
    void updatePerson() {
      PersonEntity entity = createPersonEntity(1L, "Person", "person@mail.com", LocalDate.of(2000, 2, 2));
      UpdatePersonDTO updatePersonDTO = new UpdatePersonDTO("New Person", "newperson@mail.com", LocalDate.of(2000, 1, 1));

      when(personRepository.findById(entity.getId())).thenReturn(Optional.of(entity));
      when(personRepository.save(entity))
        .thenReturn(createPersonEntity(
          entity.getId(),
          updatePersonDTO.name(),
          updatePersonDTO.email(),
          updatePersonDTO.birthDate()
      ));

      personService.updatePerson(entity.getId(), updatePersonDTO);

      // 3. Assert: Verificar se os novos dados do DTO foram aplicados à entidade.
      assertEquals(updatePersonDTO.birthDate(), entity.getBirthDate());
    }

    @Test
    @DisplayName("Should throw PersonNotFoundException when updating non-existent person")
    void updatePersonNotFound() {
        Long id = 1L;
        UpdatePersonDTO updatePersonDTO = new UpdatePersonDTO("New Person", "newperson@mail.com", LocalDate.of(2000, 1, 1));

        when(personRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(
            PersonNotFoundException.class,
            () -> personService.updatePerson(id, updatePersonDTO)
        );

        verify(personRepository, times(0)).save(any(PersonEntity.class));
    }

    @Test
    @DisplayName("Should delete person successfully")
    void deletePerson() {
      Long id = 1L;
      when(personRepository.existsById(id)).thenReturn(true);

      personService.deletePerson(id);

      verify(personRepository, times(1)).deleteById(anyLong());
    }

    @Test
    @DisplayName("Should throw PersonNotFoundException when deleting non-existent person")
    void deletePersonNotFound() {
        Long id = 1L;

        when(personRepository.existsById(id)).thenReturn(false);

        assertThrows(
            PersonNotFoundException.class,
            () -> personService.deletePerson(id)
        );

        verify(personRepository, times(0)).deleteById(anyLong());
    }
}
