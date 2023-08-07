package com.filesta.controller;

import java.util.List;

import com.filesta.dto.FileDTO;
import com.filesta.dto.ShareFileDTO;
import com.filesta.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*")
public class FileController {
    
    @Autowired
    private FileService fileService;

    @PostMapping(value = "/upload", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadFile(@RequestPart("file") MultipartFile file, @RequestPart("fileInfo") String fileInfo){
        return new ResponseEntity<String>(fileService.uploadFile(file, fileInfo), HttpStatus.OK);
    }

    @GetMapping(value = "/{link}")
    public ResponseEntity<?> fetchFile(@PathVariable("link") String link){
        return fileService.fetchFile(link);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable("id") Long id){
        return new ResponseEntity<String>(fileService.deleteFile(id), HttpStatus.OK);
    }

    @PostMapping(value = "/share")
    public ResponseEntity<String> shareFile(@RequestBody ShareFileDTO shareFileDTO){
        return new ResponseEntity<String>(fileService.shareFile(shareFileDTO), HttpStatus.OK);
    }

    @GetMapping(value = "/all/{userId}")
    public ResponseEntity<?> fetchAllFiles(@PathVariable("userId") Long userId, @RequestParam("offset") int offset, @RequestParam("limit") int limit, @RequestParam("order") String order){
        return new ResponseEntity<List<FileDTO>>(fileService.fetchAllFiles(userId, offset, limit, order), HttpStatus.OK);
    }

    @GetMapping(value = "/count/{userId}")
    public ResponseEntity<?> getCountOfFiles(@PathVariable("userId") Long userId){
        return new ResponseEntity<Integer>(fileService.getCountOfFiles(userId), HttpStatus.OK);
    }
}
