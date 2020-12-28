package net.app.main.dao;

import net.app.main.model.GameRank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRankDao extends JpaRepository<GameRank, Long>{

    GameRank findOneByPlayernameAndGamename(String playername, String gamename);

    long countByGamename(String gamename);

    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreDescPlayernameAsc(String gamename);

    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreDescPlayernameAsc(String gamename, Pageable pageable);
}
