package net.app.main.dao;

import net.app.main.model.Game;
import net.app.main.model.GameRank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRankDao extends JpaRepository<GameRank, Long>{

    GameRank findOneByPlayernameAndGamename(String playername, String gamename);

    long countByGamename(String gamename);

    default List<GameRank> findAllScoreOrdered(String gamename, boolean scoringMode){
        return (scoringMode)? findByGamenameOrderByScoreDescPlayernameAsc(gamename) : findByGamenameOrderByScoreAscPlayernameAsc(gamename);
    }

    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreDescPlayernameAsc(String gamename);
    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreAscPlayernameAsc(String gamename);

    default List<GameRank> findAllScoreOrdered(String gamename, boolean scoringMode, Pageable pageable){
        return (scoringMode)? findByGamenameOrderByScoreDescPlayernameAsc(gamename, pageable) : findByGamenameOrderByScoreAscPlayernameAsc(gamename, pageable);
    }

    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreDescPlayernameAsc(String gamename, Pageable pageable);
    // génère automatiquement la req SQL en fonction du nom de la méthode
    List<GameRank> findByGamenameOrderByScoreAscPlayernameAsc(String gamename, Pageable pageable);
}
