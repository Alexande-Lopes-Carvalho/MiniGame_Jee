package net.app.main.controller;

import net.app.main.GameRankEntry;
import net.app.main.dao.*;
import net.app.main.model.GameRank;
import net.app.main.model.Stat;
import net.app.main.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
public class MainController {
    @Autowired
    private AdminDao adminDao;
    @Autowired
    private GameDao gameDao;
    @Autowired
    private PlayerDao playerDao;
    @Autowired
    private GameRankDao gameRankDao;
    @Autowired
    private StatDao statDao;
    @Autowired
    private SuperAdminDao superAdminDao;
    @Autowired
    private UserDao userDao;


    public String encode(String password){
        return password;
    }

    public String decrypt(String encodedPassword){
        return encodedPassword;
    }

    public boolean matches(String rawPassword, String encodedPassword){
        return rawPassword.equals(decrypt(encodedPassword));
    }

    @RequestMapping("/showUser")
    public String showUser(Model m){
        m.addAttribute("listUser", userDao.findAll());
        return "show/user";
    }

    @RequestMapping("/showPlayer")
    public String showPlayer(Model m){
        m.addAttribute("listPlayer", playerDao.findAll());
        return "show/player";
    }

    @RequestMapping("/showAdmin")
    public String showAdmin(Model m){
        m.addAttribute("listAdmin", adminDao.findAll());
        return "show/admin";
    }

    @RequestMapping("/showSuperAdmin")
    public String showSuperAdmin(Model m){
        m.addAttribute("listSuperAdmin", superAdminDao.findAll());
        return "show/superAdmin";
    }

    @RequestMapping("/showGame")
    public String showGame(Model m){
        m.addAttribute("listGame", gameDao.findAll());
        return "show/game";
    }

    @RequestMapping("/showStat")
    public String showStat(Model m){
        m.addAttribute("listStat", statDao.findAll());
        return "show/stat";
    }

    @RequestMapping("/showGameRank")
    public String showGameRank(Model m){
        m.addAttribute("listGameRank", gameRankDao.findAll());
        return "show/gameRank";
    }

    @RequestMapping("/showSession")
    public String showSession(){
        return "show/session";
    }

    @GetMapping("/addUser")
    public String addUser(@RequestParam(name="name") String name,
                          @RequestParam(name="mail") String mail,
                          @RequestParam(name="password") String password,
                          Model m){
        User u = new User();
        u.setName(name);
        u.setMail(mail);
        u.setPassword(password);
        userDao.save(u);
        return showUser(m);
    }

    @RequestMapping("/snakeDummy")
    public String snakeDummy(){ // comment les sessions sont gérées en spring ?
        return /*(isLoggedIn())?*/ "games/snakeDummy" /*: "signup"*/;
    }

    @RequestMapping("/saveScore")
    public String saveScore(@RequestParam(name="game") String game,
                            @RequestParam(name="score") String score,
                            @RequestParam(name="time") String time, HttpSession session){
        //System.out.println("pass " + playerName + " " + game + " " + score + " " + time);
        String playerName = (String)session.getAttribute("name");
        if(playerName == null || !playerDao.existsById(playerName)){
            return "ajaxAnswer/null"; // utilisateur non connecté ou utilisateur connecté n'étant pas un joueur
        }
        GameRank k = gameRankDao.findOneByPlayernameAndGamename(playerName, game);
        //System.out.println(k);
        if(k == null || k.getScore() < Long.valueOf(score)) {
            //System.out.println("adding/removing");
            if(k == null){
                k = new GameRank();
                k.setPlayername(playerName);
                k.setGamename(game);
            }
            k.setScore(Long.valueOf(score));
            k.setTime(Long.valueOf(time));
            gameRankDao.save(k); // modification de l'élément dans la table si deja existant ou ajout
        }
        return "ajaxAnswer/null";
    }

    @RequestMapping("/connect")
    public String connect(@RequestParam(name="name") String name,
                          @RequestParam(name="password") String password,
                          Model m, HttpSession session){
        Optional<User> u = userDao.findById(name);
        if(u.isPresent() && matches(password, u.get().getPassword())){
            session.setAttribute("name", u.get().getName());
            return showSession();
        } else {
            return login(session);
        }
    }

    @RequestMapping("/login")
    public String login(HttpSession session){
        if(null != session.getAttribute("name")){ // deja connecte
            return showSession();
        }
        return "session/login";
    }

    @RequestMapping("/disconnect")
    public String disconnect(HttpSession session){
        session.setAttribute("name", null);
        return "session/disconnect";
    }

    @RequestMapping("/localRank")
    public String localRank(@RequestParam(name="gamename") String gamename,
                            Model m, HttpSession httpSession){
        //m.addAttribute("listeLocalRank",statDao.findAll());
        String pname=(String)httpSession.getAttribute("name");

        System.out.println("LOCAL \n NOM "+pname);

        Stat s = new Stat();
        //s.setPlayername();
        s.setAveragescore(0);
        s.setGameplayed(0);
        s.setGamename(gamename);

        if (pname == null || !playerDao.existsById(pname)){
            m.addAttribute("localRank",s);
            System.out.println("Rank vide ajouté");
        }else{
            Stat stat = statDao.findOneByPlayernameAndGamename(pname,gamename);
            m.addAttribute("localRank",(stat == null)? s : stat);
            System.out.println("stat ajouté");
        }

        return "show/gameRankLocal";
    }


    @RequestMapping("/globalRank")
    public String GlobalRank(@RequestParam(name="gamename") String gamename,
            Model m, HttpSession httpSession) {

        //List<GameRank> gameRanks = gameRankDao.findAll(Sort.by("score").descending());
        //gameRanks.removeIf(n-> (!n.getGamename().equals("snakeDummy")));

        List<GameRank> gameRanks = gameRankDao.findByGamenameOrderByScoreDescPlayernameAsc(gamename);
        System.out.println("gameRanks SIZE"+gameRanks.size()+"gameName : "+gamename);
        //List<GameRank> gameRanksClassement = new ArrayList<>();
        TreeSet<GameRankEntry> gameRanksClassement = new TreeSet<GameRankEntry>();

        int plusOuMoins=2;
        for(int k=0, l=Math.min(3,gameRanks.size()); k<l ; k++){
            GameRankEntry g = new GameRankEntry(gameRanks.get(k),k+1);
            gameRanksClassement.add(g);
        }

        String pname=(String)httpSession.getAttribute("name");

        // position == index+1
        int indexUser=-1;

        for (int i=0; i<gameRanks.size(); i++){

            if (gameRanks.get(i).getPlayername().equals(pname)){
                indexUser=i;
                System.out.println("Comparing ..."+gameRanks.get(i).getPlayername());
                System.out.println("Position user : "+indexUser+"("+pname+")");
                break;
            }else if(i==gameRanks.size()-1){
                //return ""; // si connecté mais a pas encore joué ?
                for(int k=0, l=Math.min(5,gameRanks.size()); k<l ; k++){
                    GameRankEntry g = new GameRankEntry(gameRanks.get(k),k+1);
                    gameRanksClassement.add(g);
                }
                m.addAttribute("listeGlobalRank", gameRanksClassement);
                return "show/gameRankGlobal";
            }
        }

        for (int i = 0; i<2*plusOuMoins+1; i++){
            int indexChercher=indexUser-plusOuMoins+i;
            System.out.println("indexChercher:"+indexChercher);
            System.out.println("plusOuMoins:"+plusOuMoins);
            if(i==0 && indexChercher-(gameRanksClassement.last().getPosition()-1)>1 ){
                GameRankEntry g = new GameRankEntry(null,gameRanksClassement.last().getPosition()+1); // apres top 3
                gameRanksClassement.add(g);
            }

            if(indexChercher>=0 && indexChercher<gameRanks.size()){
                GameRankEntry g = new GameRankEntry(gameRanks.get(indexChercher),indexChercher+1);
                System.out.println("bool "+ gameRanksClassement.add(g));
                System.out.println("PASS g.egtPname:"+g.getGameRank().getPlayername());
            }
        }

        // vérification console du classement
        for (GameRankEntry k: gameRanksClassement) {
            System.out.println(k);
        }

        // une fois les données de classement sélectionnées on les met dans listeGlobalRank qui sera accessible en jsp
        m.addAttribute("listeGlobalRank", gameRanksClassement);

        return "show/gameRankGlobal";
    }


    @RequestMapping("/fullGameRankc")
    public String fullGameRank(Model m) {
        m.addAttribute("listeFullGlobalRank", gameRankDao.findAll(Sort.by("score").descending()));
        return "show/fullGameRank";
    }

    @RequestMapping("/gameRankLocal")
    public String dataClassement() {
        return "show/gameRankLocal";
    }

    @RequestMapping("/gameRankGlobal")
    public String dataClassementG() {
        return "show/gameRankGlobal";

    }

}
