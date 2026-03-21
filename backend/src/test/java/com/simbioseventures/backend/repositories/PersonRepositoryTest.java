package com.simbioseventures.backend.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.entities.PersonEntity;
import jakarta.persistence.EntityManager;

@DataJpaTest
@ActiveProfiles("test")
public class PersonRepositoryTest {

  @Autowired
  private EntityManager entityManager;

  @Autowired
  private PersonRepository personRepository;
 
  private CreatePersonDTO createPersonDTO() {
    CreatePersonDTO user = new CreatePersonDTO("Person", "person@mail.com", LocalDate.of(2004, 1, 22));
    return user;
  } 

  @Test
  @DisplayName("Should return true when email already exists")
  void shouldReturnTrueWhenEmailAlreadyExists() {
    CreatePersonDTO personData = createPersonDTO();
    PersonEntity personEntity = new PersonEntity();

    personEntity.setName(personData.name());
    personEntity.setEmail(personData.email());
    personEntity.setBirthDate(personData.birthDate());

    entityManager.persist(personEntity);
    
    boolean result = this.personRepository.existsByEmail(personEntity.getEmail());

    assertThat(result).isTrue();
  }

  @Test
  @DisplayName("Should return false when email does not exist")
  void shouldNotFindPersonByEmail() {
    boolean result = this.personRepository.existsByEmail("nao-existe@mail.com");
    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("Should get person successfully from db")
  void shouldFindPersonById() {
    CreatePersonDTO personData = createPersonDTO();
    PersonEntity personEntity = new PersonEntity();
    personEntity.setName(personData.name());
    personEntity.setEmail(personData.email());
    personEntity.setBirthDate(personData.birthDate());

    entityManager.persist(personEntity);

    Optional<PersonResponseDTO> result = this.personRepository.findPersonById(personEntity.getId());

    assertThat(result.isPresent()).isTrue();
  }

  @Test
  @DisplayName("Should not find person when id does not exist")
  void shouldNotFindPersonById() {
    Optional<PersonResponseDTO> result = this.personRepository.findPersonById(1L);
    assertThat(result.isEmpty()).isTrue();
  }

}
