package com.phonebook.repository;

import com.phonebook.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    Contact findByNameAndSurname(String name, String surname);
    Contact findByEmail(String email);
    Contact findByPhone(String phone);
}