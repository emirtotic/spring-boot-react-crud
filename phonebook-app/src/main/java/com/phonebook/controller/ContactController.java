package com.phonebook.controller;

import com.phonebook.dto.ContactDTO;
import com.phonebook.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/update/{id}")
    public ContactDTO updateContact(@PathVariable Long id, @RequestBody ContactDTO contactDTO) {
        return contactService.updateContact(id, contactDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> findContactById(@PathVariable Long id) {

        ContactDTO contactDTO = contactService.findContactById(id);

        return ResponseEntity.ok(contactDTO);
    }

}
