package net.app.main.dao;

import net.app.main.model.Stat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatDao extends JpaRepository<Stat, Long> {
}
