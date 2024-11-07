package com.phonebook.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ContactDTO {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phone;
}
