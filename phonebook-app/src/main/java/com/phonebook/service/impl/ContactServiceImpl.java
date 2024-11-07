package com.phonebook.service.impl;

import com.phonebook.dto.ContactDTO;
import com.phonebook.entity.Contact;
import com.phonebook.repository.ContactRepository;
import com.phonebook.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    public List<ContactDTO> findAll() {
        return contactRepository.findAll().stream()
                .map(this::assembleContactDTO).collect(Collectors.toList());
    }

    @Override
    public ContactDTO addNewContact(ContactDTO contactDTO) {
        Contact contact = assembleContact(contactDTO);
        contactRepository.save(contact);
        return contactDTO;
    }

    @Override
    public ContactDTO updateContact(Long id, ContactDTO contactDTO) {

        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
        contact = assembleContact(contactDTO);
        contactRepository.save(contact);
        return assembleContactDTO(contact);
    }

    @Override
    public ContactDTO updateContact(Long id) {

        Optional<Contact> existingContactOpt = contactRepository.findById(id);

        if (existingContactOpt.isPresent()) {
            Contact existingContact = existingContactOpt.get();
            Contact updatedContact = contactRepository.save(existingContact);

            return assembleContactDTO(updatedContact);
        } else {
            throw new RuntimeException("Contact with id " + id + " not found");
        }
    }

    @Override
    public ContactDTO findContactById(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);

        if (contact.isPresent()) {

            return assembleContactDTO(contact.get());
        } else {
            throw new RuntimeException("Contact with id " + id + " not found");
        }

    }

    @Override
    public void deleteContact(Long id) {
        Optional<Contact> contact = Optional.ofNullable(contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id " + id)));

        contact.ifPresent(contactRepository::delete);
    }

    @Override
    public ContactDTO findByNameAndSurname(String name, String surname) {
        Contact contact = contactRepository.findByNameAndSurname(name, surname);
        return assembleContactDTO(contact);
    }

    @Override
    public ContactDTO findByEmail(String email) {
        Contact contact = contactRepository.findByEmail(email);
        return assembleContactDTO(contact);
    }

    @Override
    public ContactDTO findByPhone(String phone) {
        Contact contact = contactRepository.findByPhone(phone);
        return assembleContactDTO(contact);
    }

    private ContactDTO assembleContactDTO(Contact contact) {
        return ContactDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .surname(contact.getSurname())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .build();
    }

    private Contact assembleContact(ContactDTO contactDTO) {
        return Contact.builder()
                .id(contactDTO.getId())
                .name(contactDTO.getName())
                .surname(contactDTO.getSurname())
                .email(contactDTO.getEmail())
                .phone(contactDTO.getPhone())
                .build();
    }

}
