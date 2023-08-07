package com.filesta.controller;

import java.util.List;

import com.filesta.dto.CommentDTO;
import com.filesta.dto.CommentRequestDTO;
import com.filesta.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "*")
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> getComments(@RequestBody CommentRequestDTO request){
        return new ResponseEntity<List<CommentDTO>>(commentService.getComments(request), HttpStatus.OK);
    }
    
    @PostMapping(value = "/add")
    public ResponseEntity<?> saveComment(@RequestBody CommentRequestDTO comment){
        return new ResponseEntity<CommentDTO>(commentService.saveComment(comment), HttpStatus.OK);
    }
}
