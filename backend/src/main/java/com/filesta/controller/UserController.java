package com.filesta.controller;

import com.filesta.dto.LoginDTO;
import com.filesta.dto.SessionDTO;
import com.filesta.dto.SignupDTO;
import com.filesta.dto.UserDTO;
import com.filesta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        return new ResponseEntity<SessionDTO>(userService.login(loginDTO), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public void logout(String userName, String password){
        userService.logout(userName, password);
    }

    @PostMapping(value = "/signup", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> signup(@RequestBody SignupDTO signupDTO){
        return new ResponseEntity<String>(userService.signUp(signupDTO), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id){
         return new ResponseEntity<UserDTO>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/upload-avatar")
    public ResponseEntity<?> uploadAvatar(@RequestParam("avatar") String avatar, @RequestParam("id") Long id) {
        return new ResponseEntity<String>(userService.uploadAvatar(avatar, id), HttpStatus.OK);
    }
    
    @PostMapping(value = "/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDto){
        return new ResponseEntity<String>(userService.updateUser(userDto), HttpStatus.OK);
    }
}