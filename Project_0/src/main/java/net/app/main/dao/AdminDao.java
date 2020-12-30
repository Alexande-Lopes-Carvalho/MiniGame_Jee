package net.app.main.dao;

import net.app.main.model.Admin;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminDao extends JpaRepository<Admin, String> {
    List<Admin> findAllByOrderByAdminnameAsc(Pageable pageable);
}
