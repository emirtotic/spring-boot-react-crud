package com.phonebook.service;

import com.phonebook.dto.ContactDTO;

import java.util.List;

public interface ContactService {

    List<ContactDTO> findAll();
    ContactDTO addNewContact(ContactDTO contactDTO);
    ContactDTO updateContact(ContactDTO contactDTO);
    ContactDTO findByNameAndSurname(String name, String surname);
    ContactDTO findByEmail(String email);
    ContactDTO findByPhone(String phone);
    void deleteContact(Long id);

}
