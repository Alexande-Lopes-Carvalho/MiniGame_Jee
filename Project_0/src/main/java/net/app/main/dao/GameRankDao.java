package net.app.main.dao;

import net.app.main.model.GameRank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRankDao extends JpaRepository<GameRank, Long>{
    GameRank findOneByPlayernameAndGamename(String playername, String gamename);
}
