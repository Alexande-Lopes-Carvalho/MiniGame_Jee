package net.app.main.dao;

import net.app.main.model.Stat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatDao extends JpaRepository<Stat, Long> {
    Stat findOneByPlayernameAndGamename(String playername, String gamename);
}
