package com.filesta.serviceimpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.filesta.dto.CommentDTO;
import com.filesta.dto.CommentRequestDTO;
import com.filesta.model.Comment;
import com.filesta.model.File;
import com.filesta.model.MapCommentFile;
import com.filesta.model.User;
import com.filesta.repo.CommentDao;
import com.filesta.repo.FileDao;
import com.filesta.repo.UserDao;
import com.filesta.service.CommentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private static Logger LOGGER = LogManager.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private FileDao fileDao;

    @Autowired
    private UserDao userDao;

    @Override
    public List<CommentDTO> getComments(CommentRequestDTO request) {
        List<CommentDTO> result = new ArrayList<>();
        List<MapCommentFile> mapCmntFileList = commentDao.getComments(request.getFileLink());
        for (MapCommentFile entity : mapCmntFileList) {
            CommentDTO comment = new CommentDTO();
            comment.setId(entity.getComment().getPkCommentId());
            comment.setCommentBody(entity.getComment().getCommentBody());
            comment.setUsername(entity.getComment().getUser().getName());
            result.add(comment);
        }
        return result;
    }

    @Override
    public CommentDTO saveComment(CommentRequestDTO request) {
        CommentDTO result = new CommentDTO();
        try {
            Comment comment = new Comment();
            File file = fileDao.fetchFileByLink(request.getFileLink());
            User user = userDao.getUserById(request.getUserId());
            comment.setUser(user);
            comment.setCommentDate(new Date());
            comment.setCommentBody(request.getCommentBody());
            comment = commentDao.saveComment(comment);
            MapCommentFile map = new MapCommentFile();
            map.setComment(comment);
            map.setFile(file);
            commentDao.saveMap(map);
            result.setCommentBody(request.getCommentBody());
            result.setUsername(user.getName());
            result.setId(comment.getPkCommentId());
        } catch (Exception e) {
            LOGGER.error("Exception saving comment:: ", e);
        }
        return result;
    }

}
