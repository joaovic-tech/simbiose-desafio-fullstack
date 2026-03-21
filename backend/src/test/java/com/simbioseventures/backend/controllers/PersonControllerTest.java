package com.simbioseventures.backend.controllers;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.client.RestTestClient;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.services.PersonService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(PersonController.class)
@AutoConfigureRestTestClient
public class PersonControllerTest {

  @Autowired
  private RestTestClient restTestClient;

  // Definindo o duble
  @MockitoBean
  private PersonService personService;

  @Test
  @DisplayName("Should return 201 when the person data is valid.")
  void createPersonWithValidData() {
    // Arrange
    CreatePersonDTO createPersonDTO = new CreatePersonDTO("Test Name", "test@test.com", LocalDate.of(1990, 5, 15));
    PersonResponseDTO personResponseDTO = new PersonResponseDTO(1L, "Test Name", "test@test.com",
        LocalDate.of(1990, 5, 15));

    // Ensinamos ao Mock o que retornar quando for chamado

    when(personService.createPerson(any(CreatePersonDTO.class))).thenReturn(personResponseDTO);

    // Act & Assert
    restTestClient.post()
        .uri("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .body(createPersonDTO)
        .exchange()
        .expectStatus().isCreated()
        .expectBody()
        .jsonPath("$.id").isEqualTo(1)
        .jsonPath("$.name").isEqualTo("Test Name")
        .jsonPath("$.email").isEqualTo("test@test.com")
        .jsonPath("$.birthDate").isEqualTo("1990-05-15");
  }

  @Test
  @DisplayName("Should return 400 when the person data is invalid.")
  void createPersonWithInvalidData() {
    CreatePersonDTO createPersonDTO = new CreatePersonDTO("", "email", LocalDate.of(2000, 2, 2));

    restTestClient.post()
        .uri("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .body(createPersonDTO)
        .exchange()
        .expectStatus().isBadRequest();
  }

  @Test
  @DisplayName("Should return 409 Conflict when e-mail already exists")
  void createPersonWithDuplicateEmail() {
    CreatePersonDTO createPersonDTO = new CreatePersonDTO("Test Name", "test@test.com", LocalDate.of(1990, 5, 15));

    when(personService.createPerson(any(CreatePersonDTO.class)))
        .thenThrow(new IllegalArgumentException("E-mail already registered"));

    restTestClient.post()
        .uri("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .body(createPersonDTO)
        .exchange()
        .expectStatus().isEqualTo(HttpStatus.CONFLICT)
        .expectBody()
        .jsonPath("$.message").isEqualTo("E-mail already registered");
  }
}
