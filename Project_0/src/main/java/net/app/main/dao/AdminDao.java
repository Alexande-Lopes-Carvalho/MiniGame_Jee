package net.app.main.dao;

import net.app.main.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDao extends JpaRepository<Admin, String> {
}
