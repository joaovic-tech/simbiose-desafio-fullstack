package com.simbioseventures.backend.controllers;

import com.simbioseventures.backend.dtos.CreatePersonDTO;
import com.simbioseventures.backend.dtos.PersonResponseDTO;
import com.simbioseventures.backend.exceptions.GlobalExceptionHandler;
import com.simbioseventures.backend.services.PersonService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.springframework.test.context.bean.override.mockito.MockitoBean;

@WebMvcTest({PersonController.class, GlobalExceptionHandler.class})
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private PersonService personService;

    @Test
    @DisplayName("Should create a new person successfully")
    void testCreatePerson() throws Exception {
        CreatePersonDTO data = new CreatePersonDTO("João da Silva", "joao@example.com", LocalDate.of(2000, 1, 1));

        PersonResponseDTO mockResponse = new PersonResponseDTO(
                1L, "João da Silva", "joao@example.com", LocalDate.of(2000, 1, 1));

        when(personService.createPerson(any(CreatePersonDTO.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/pessoa")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(data)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("João da Silva"))
                .andExpect(jsonPath("$.email").value("joao@example.com"))
                .andExpect(jsonPath("$.birthDate").value("2000-01-01"));
    }

    @Test
    @DisplayName("Should return 409 Conflict when e-mail already exists")
    void testCreatePersonWithDuplicateEmail() throws Exception {
        CreatePersonDTO data = new CreatePersonDTO("João da Silva", "joao@example.com", LocalDate.of(2000, 1, 1));

        when(personService.createPerson(any(CreatePersonDTO.class)))
                .thenThrow(new IllegalArgumentException("E-mail already registered"));

        mockMvc.perform(post("/pessoa")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(data)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.error").value("Conflict"))
                .andExpect(jsonPath("$.message").value("E-mail already registered"))
                .andExpect(jsonPath("$.path").value("/pessoa"));
    }
}

