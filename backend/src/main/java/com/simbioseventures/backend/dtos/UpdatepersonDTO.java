package com.simbioseventures.backend.dtos;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

public record UpdatepersonDTO(
  @NotBlank(message = "Name is required")
  @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
  String name,
  @NotBlank(message = "E-mail is required")
  @Email(message = "E-mail invalid")
  String email,
  @NotNull(message = "Birth date is required")
  @PastOrPresent(message = "Birth date must be in the past or present")
  LocalDate birthDate
) {
}
