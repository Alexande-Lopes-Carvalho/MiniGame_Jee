package net.app.main.auxiliary;

import net.app.main.model.GameRank;

public class GameRankEntry implements Comparable<GameRankEntry>{
    private GameRank gameRank;
    private long position;
    private double score;
    private String playername;
    private boolean scoringMode;


    public GameRankEntry(GameRank gameRank, long position, boolean _scoringMode) {
        this.gameRank = gameRank;
        this.position = position;
        scoringMode = _scoringMode;
        if(gameRank!=null){
            score=gameRank.getScore();
            playername=gameRank.getPlayername();
        }else{
            playername="";
        }
    }
/*
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameRankEntry that = (GameRankEntry) o;
        return position == that.position &&
                //Objects.equals(gameRank, that.gameRank);
                gameRank==that.gameRank;
    }*/

    public void setPosition(long position) {
        this.position = position;
    }

    public GameRank getGameRank() {
        return gameRank;
    }

    public long getPosition() {
        return position;
    }

    @Override
    public int compareTo(GameRankEntry o) {
        if(o.getGameRank()==null || this.getGameRank()==null){
            return (int) (this.getPosition()-o.getPosition());
        }else{
            int r = ((scoringMode)? 1 : -1) * (int)(o.getGameRank().getScore()-gameRank.getScore());
            return (r != 0)? r : gameRank.getPlayername().compareTo(o.getGameRank().getPlayername());
        }
        // si res<0 => this<o
    }

    public String toString(){
        return ((gameRank == null)? "" : gameRank)+"("+position+")";
    }

}