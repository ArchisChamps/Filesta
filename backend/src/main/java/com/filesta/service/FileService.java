package com.filesta.service;

import java.util.List;

import com.filesta.dto.FileDTO;
import com.filesta.dto.ShareFileDTO;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    public String uploadFile(MultipartFile file, String fileInfo);

    public ResponseEntity<Resource> fetchFile(String link);

    public String deleteFile(Long id);

    public String shareFile(ShareFileDTO shareFileDTO);

    public List<FileDTO> fetchAllFiles(Long userId, int offset, int limit, String order);

    public Integer getCountOfFiles(Long userId);

    
    
}
