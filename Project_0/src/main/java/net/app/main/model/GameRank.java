package net.app.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="gamerank")
public class GameRank {
  @Id
  private long idgamerank;
  @Column(name="playername")
  private String playername;
  @Column(name="gamename")
  private String gamename;
  @Column(name="score")
  private long score;
  @Column(name="time")
  private long time;



  public long getIdgamerank() {
    return idgamerank;
  }

  public void setIdgamerank(long idgamerank) {
    this.idgamerank = idgamerank;
  }


  public String getPlayername() {
    return playername;
  }

  public void setPlayername(String playername) {
    this.playername = playername;
  }


  public String getGamename() {
    return gamename;
  }

  public void setGamename(String gamename) {
    this.gamename = gamename;
  }


  public long getScore() {
    return score;
  }

  public void setScore(long score) {
    this.score = score;
  }

  public long getTime() {
    return time;
  }

  public void setTime(long time) {
    this.time = time;
  }

  public String toString() {
    //return "id("+idgamerank+");player("+playername+");game("+gamename+");score("+score+");time("+time+")\n";
    return idgamerank+";"+playername+";"+gamename+";"+score+";"+time+"\n";
  }
}
