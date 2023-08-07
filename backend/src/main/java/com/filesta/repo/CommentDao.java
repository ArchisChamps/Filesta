package com.filesta.repo;

import java.util.List;

import com.filesta.model.Comment;
import com.filesta.model.MapCommentFile;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class CommentDao {

    @PersistenceContext
    EntityManager entityManager;

    public List<MapCommentFile> getComments(String link) {
        return entityManager.createQuery("from MapCommentFile mp where mp.file.uniqueLink=:link", MapCommentFile.class).setParameter("link", link).getResultList();
    }

    @Transactional
    public Comment saveComment(Comment comment) {
        return entityManager.merge(comment);
    }

    @Transactional
    public void saveMap(MapCommentFile map) {
        entityManager.merge(map);
    }
    


}
