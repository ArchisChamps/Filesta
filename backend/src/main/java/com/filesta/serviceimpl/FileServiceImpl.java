package com.filesta.serviceimpl;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.filesta.dto.FileDTO;
import com.filesta.dto.FileInfoDTO;
import com.filesta.dto.ShareFileDTO;
import com.filesta.model.File;
import com.filesta.model.User;
import com.filesta.model.ViewAccess;
import com.filesta.repo.FileDao;
import com.filesta.repo.UserDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.filesta.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    private static Logger LOGGER = LogManager.getLogger(UserServiceImpl.class);

    @Autowired
    private FileDao fileDao;

    @Autowired
    private UserDao userDao;

    // @Autowired
    // private EmailServiceHelper emailServiceHelper;

    @Override
    public String uploadFile(MultipartFile file, String fileInfo) {
        LOGGER.info("Inside uploadFile method ::" + fileInfo);
        FileInfoDTO fileInfoDTO = new FileInfoDTO();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            fileInfoDTO = objectMapper.readValue(fileInfo, FileInfoDTO.class);
            File fileObj = new File();
            String originalFileName = file.getOriginalFilename();
            User user = userDao.getUserById(fileInfoDTO.getUserId());
            fileObj.setName(fileInfoDTO.getFileName() + originalFileName.substring(originalFileName.lastIndexOf('.')));
            fileObj.setDescription(fileInfoDTO.getDescription());
            fileObj.setUploadedDate(new Date());
            fileObj.setFile(file.getBytes());
            fileObj.setSize(file.getSize());
            fileObj.setUser(user);
            fileObj = fileDao.saveFile(fileObj);
            String uniqueLink = getUniqueLinkForFile(fileObj.getUploadedDate().toString()+fileObj.getPkFileId());
            fileObj.setUniqueLink(uniqueLink);
            fileDao.saveFile(fileObj);
        } catch (Exception e) {
            LOGGER.error("Error uploading file :: ", e);
            return "Failed";
        }
        return "Success";
    }

    public static String getUniqueLinkForFile(String input) {
        return Base64.getEncoder()
              .encodeToString(input.getBytes());
    }

    @Override
    public ResponseEntity<Resource> fetchFile(String link) {
        File file = fileDao.fetchFileByLink(link);
        byte[] source = file.getFile();
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(source));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+file.getName());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.getSize())
                .body(resource);
    }

    @Override
    public String deleteFile(Long id) {
        File file = fileDao.fetchFile(id);
        if (!Objects.isNull(file)) {
            file.setDeleted(true);
            fileDao.saveFile(file);
            return "Success";
        }
        return "Failed";
    }

    @Override
    public String shareFile(ShareFileDTO shareFileDTO) {
        List<User> userList = userDao.getUserByEmail(shareFileDTO.getReceiverEmail());
        if (userList.isEmpty()) {
            return "Invalid email address";
        }
        User receiver = userList.get(0);

        if (Objects.isNull(receiver)) {
            return "Unauthorized";
        }

        File file = fileDao.fetchFile(shareFileDTO.getFileId());
        User sender = userDao.getUserById(shareFileDTO.getUserId());

        ViewAccess viewAccess = new ViewAccess();
        viewAccess.setFile(file);
        viewAccess.setUser(receiver);
        fileDao.provideViewAccess(viewAccess);

        for (String shareType : shareFileDTO.getShareType()) {
            if ("Notification".equals(shareType)) {
                // save notification information
            } else if ("Email".equals(shareType)) {
                // send email
            }
        }
        return "Success";
    }

    @Override
    public List<FileDTO> fetchAllFiles(Long userId, int offset, int limit, String order) {
        List<FileDTO> files = new ArrayList<>();
        try {
            List<File> dbFiles = fileDao.getAllFiles(userId, offset, limit, order);
            for (File file : dbFiles) {
                FileDTO fileDTO = new FileDTO();
                fileDTO.setFilename(file.getName());
                fileDTO.setId(file.getPkFileId());
                fileDTO.setUploadedDate(file.getUploadedDate());
                fileDTO.setUniqueLink(file.getUniqueLink());
                files.add(fileDTO);
            }
        } catch (Exception e) {
            LOGGER.error("Error fetching all files ::", e);
        }
        return files;
    }

    @Override
    public Integer getCountOfFiles(Long userId) {
        try {
            return fileDao.getFilesCount(userId);
        } catch (Exception e) {
            LOGGER.error("Error fetching all files ::", e);
        }
        return 0;
    }

}
