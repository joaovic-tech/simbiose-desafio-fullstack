package com.simbioseventures.backend.controllers;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.dtos.UpdatePersonDTO;
import com.simbioseventures.backend.exceptions.PersonNotFoundException;
import com.simbioseventures.backend.services.PersonService;

import tools.jackson.databind.ObjectMapper;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PersonController.class)
public class PersonControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private PersonService personService;

  @Test
  @DisplayName("RF01: Should return 201 when the person data is valid.")
  void createPersonWithValidData() throws Exception {
    // Arrange
    CreatePersonDTO personDTO = new CreatePersonDTO("Test Name", "test@test.com", LocalDate.of(1990, 5, 15));
    PersonResponseDTO personResponseDTO = new PersonResponseDTO(1L, "Test Name", "test@test.com", LocalDate.of(1990, 5, 15));

    when(personService.createPerson(any(CreatePersonDTO.class))).thenReturn(personResponseDTO);

    // Act & Assert
    mockMvc.perform(post("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(personDTO)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.name").value("Test Name"))
        .andExpect(jsonPath("$.email").value("test@test.com"))
        .andExpect(jsonPath("$.birthDate").value("1990-05-15"));
  }

  @Test
  @DisplayName("Should return 400 when the person data is invalid.")
  void createPersonWithInvalidData() throws Exception {
    // Arrange: Nome vazio e email inválido para acionar o Bean Validation
    CreatePersonDTO invalidDTO = new CreatePersonDTO("", "invalid-email", null);

    // Act & Assert
    mockMvc.perform(post("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(invalidDTO)))
        .andExpect(status().isBadRequest());
  }

  @Test
  @DisplayName("Should return 409 Conflict when e-mail already exists.")
  void createPersonWithDuplicateEmail() throws Exception {
    // Arrange
    CreatePersonDTO personDTO = new CreatePersonDTO("Test Name", "test@test.com", LocalDate.of(1990, 5, 15));

    when(personService.createPerson(any(CreatePersonDTO.class)))
        .thenThrow(new IllegalArgumentException("E-mail already registered"));

    // Act & Assert
    mockMvc.perform(post("/pessoa")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(personDTO)))
        .andExpect(status().isConflict());
  }

  @Test
  @DisplayName("RF02: Should return 200 when the person is found by id.")
  void findPersonById() throws Exception {
    // Arrange
    PersonResponseDTO personResponse = new PersonResponseDTO(1L, "Test Name", "test@test.com", LocalDate.of(1990, 5, 15));

    when(personService.findById(anyLong())).thenReturn(personResponse);

    // Act & Assert
    mockMvc.perform(get("/pessoa/1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.name").value("Test Name"))
      .andExpect(jsonPath("$.email").value("test@test.com"))
      .andExpect(jsonPath("$.birthDate").value("1990-05-15"));
  }

  @Test
  @DisplayName("Should return 404 when the person is not found by id.")
  void findPersonByIdNotFound() throws Exception {
    // Arrange
    when(personService.findById(anyLong()))
        .thenThrow(new PersonNotFoundException(999L));

    // Act & Assert
    mockMvc.perform(get("/pessoa/999"))
        .andExpect(status().isNotFound());
  }

  @Test
  @DisplayName("RF03: Should update person when Id exists and request is valid.")
  void shouldUpdatePersonWhenIdExistsAndRequestIsValid() throws Exception {
    // Arrange
    UpdatePersonDTO updateDTO = new UpdatePersonDTO("Updated Name", "updated@test.com", LocalDate.of(1995, 3, 20));
    PersonResponseDTO updatedResponse = new PersonResponseDTO(1L, "Updated Name", "updated@test.com", LocalDate.of(1995, 3, 20));

    when(personService.updatePerson(eq(1L), any(UpdatePersonDTO.class))).thenReturn(updatedResponse);

    // Act & Assert
    mockMvc.perform(put("/pessoa/1")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updateDTO)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.name").value("Updated Name"))
        .andExpect(jsonPath("$.email").value("updated@test.com"))
        .andExpect(jsonPath("$.birthDate").value("1995-03-20"));
  }

  @Test
  @DisplayName("Should return 404 when updating a person that does not exist.")
  void shouldReturnNotFoundWhenUpdatingNonExistentPerson() throws Exception {
    // Arrange
    UpdatePersonDTO updateDTO = new UpdatePersonDTO("Updated Name", "updated@test.com", LocalDate.of(1995, 3, 20));

    when(personService.updatePerson(eq(999L), any(UpdatePersonDTO.class)))
        .thenThrow(new PersonNotFoundException(999L));

    // Act & Assert
    mockMvc.perform(put("/pessoa/999")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updateDTO)))
        .andExpect(status().isNotFound());
  }

  @Test
  @DisplayName("RF04: Should return 204 when deleting a person by id.")
  void shouldDeletePersonById() throws Exception {
    // Arrange
    doNothing().when(personService).deletePerson(1L);

    // Act & Assert
    mockMvc.perform(delete("/pessoa/1"))
        .andExpect(status().isNoContent());
  }

  @Test
  @DisplayName("Should return 404 when deleting a person that does not exist.")
  void shouldReturnNotFoundWhenDeletingNonExistentPerson() throws Exception {
    // Arrange
    doThrow(new PersonNotFoundException(999L)).when(personService).deletePerson(999L);

    // Act & Assert
    mockMvc.perform(delete("/pessoa/999"))
        .andExpect(status().isNotFound());
  }
}

