package com.filesta.repo;

import java.util.List;

import com.filesta.model.File;
import com.filesta.model.ViewAccess;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class FileDao {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    public File saveFile(File file) {
        return entityManager.merge(file);
    }

    public File fetchFile(Long id) {
        return entityManager.find(File.class, id);
    }

    public File fetchFileByLink(String link) {
        return entityManager.createQuery("FROM File WHERE uniqueLink=:link", File.class).setParameter("link", link)
                .getSingleResult();
    }

    public void provideViewAccess(ViewAccess viewAccess) {
        entityManager.merge(viewAccess);
    }

    public List<File> getAllFiles(Long userId, int offset, int limit, String order) {
        if ("DESC".equalsIgnoreCase(order)) {
            return entityManager
                    .createQuery("FROM File WHERE user.pkUserId=:userId ORDER BY uploadedDate DESC", File.class)
                    .setParameter("userId", userId)
                    .setMaxResults(limit)
                    .getResultList();
        } else {
            return entityManager.createQuery("FROM File WHERE user.pkUserId=:userId", File.class)
                    .setParameter("userId", userId)
                    .getResultList();
        }
    }

    public int getFilesCount(Long userId) {
        return entityManager.createQuery("FROM File WHERE user.pkUserId=:userId", File.class)
                .setParameter("userId", userId)
                .getResultList().size();
    }

}
