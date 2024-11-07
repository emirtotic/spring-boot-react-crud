package com.phonebook.controller;

import com.phonebook.dto.ContactDTO;
import com.phonebook.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ContactController {

    private final ContactService contactService;

    @GetMapping("/all")
    public List<ContactDTO> findAll() {
        return contactService.findAll();
    }

    @PostMapping("/new")
    public ContactDTO addNewContact(@RequestBody ContactDTO contactDTO) {
        return contactService.addNewContact(contactDTO);
    }

    @DeleteMapping("/delete/{id}")
    public String addNewContact(@PathVariable(name = "id") Long id) {
        contactService.deleteContact(id);
        return "Contact deleted.";
    }

    @PutMapping("/update")
    public ContactDTO updateContact(@RequestBody ContactDTO contactDTO) {
        return contactService.updateContact(contactDTO);
    }

}
