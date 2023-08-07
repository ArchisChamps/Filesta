package com.filesta.service;

import java.util.List;

import com.filesta.dto.CommentDTO;
import com.filesta.dto.CommentRequestDTO;

public interface  CommentService {

    public List<CommentDTO> getComments(CommentRequestDTO request);

    public CommentDTO saveComment(CommentRequestDTO comment);
    
}
