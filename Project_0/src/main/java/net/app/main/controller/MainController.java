package net.app.main.controller;

import net.app.main.auxiliary.GameRankEntry;
import net.app.main.dao.*;
import net.app.main.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.security.Key;
import java.util.Base64;
import java.util.Optional;

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

    private String key = "e4o210Co69p5q7ks";
    private Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
    private Cipher cipher = createCipher();

    private Cipher createCipher(){
        try{
            return Cipher.getInstance("AES");
        } catch(Exception e){
            return null;
        }
    }

    public String encode(String password) {
        try {
            cipher.init(Cipher.ENCRYPT_MODE, aesKey);
            //System.out.println(Base64.getEncoder().encodeToString(cipher.doFinal(password.getBytes())));
            return Base64.getEncoder().encodeToString(cipher.doFinal(password.getBytes()));
        } catch(Exception e){
            return null;
        }
    }

    public String decrypt(String encodedPassword){
        try {
            cipher.init(Cipher.DECRYPT_MODE, aesKey);
            //System.out.println(new String(cipher.doFinal(Base64.getDecoder().decode(encodedPassword))));
            return new String(cipher.doFinal(Base64.getDecoder().decode(encodedPassword)));
        } catch(Exception e){
            return null;
        }
    }

    public boolean matches(String rawPassword, String encodedPassword){
        return rawPassword.equals(decrypt(encodedPassword));
    }

    @RequestMapping("/headerFooterImport")
    public String headerFooterImport(){
        //System.out.println("footer Request");
        return "ajaxAnswer/headerFooterImport";
    }

    @RequestMapping("/header")
    public String header(){
        //System.out.println("header Request");
        return "ajaxAnswer/header";
    }

    @RequestMapping("/footer")
    public String footer(){
        //System.out.println("footer Request");
        return "ajaxAnswer/footer";
    }

    public boolean isAdmin(HttpSession session){
        String name = (String) session.getAttribute("name");
        return name != null && adminDao.existsById(name);
    }

    public boolean isSuperAdmin(HttpSession session){
        String name = (String) session.getAttribute("name");
        return name != null && superAdminDao.existsById(name);
    }

    public boolean isAdminOrSuperAdmin(HttpSession session){
        String name = (String) session.getAttribute("name");
        return !(name == null || (!adminDao.existsById(name) && !superAdminDao.existsById(name)));
    }

    public boolean isLoggedIn(HttpSession session){
        return session.getAttribute("name") != null;
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

    @RequestMapping("/removeUser")
    public String removeUser(@RequestParam(name="userName") String userName,
                             HttpSession session){
        if(!isAdminOrSuperAdmin(session)){
            return "ajaxAnswer/null";
        }
        User u = userDao.getOne(userName);
        if(u != null && !superAdminDao.existsById(userName)){
            boolean userToDeleteIsAdmin = adminDao.existsById(userName);
            if((userToDeleteIsAdmin && isSuperAdmin(session)) || !userToDeleteIsAdmin){
                userDao.delete(u);
            }
        }
        return "ajaxAnswer/null";
    }

    @RequestMapping("/addUser")
    public String addUser(@RequestParam(name="name") String name,
                          @RequestParam(name="mail") String mail,
                          @RequestParam(name="password") String password,
                          Model m){
        boolean errorName = userDao.existsById(name), errorMail = userDao.existsByMail(mail);
        m.addAttribute("errorName", errorName);
        m.addAttribute("errorMail", errorMail);
        if(errorName || errorMail){
            return "ajaxAnswer/null";
        }
        User u = new User();
        u.setName(name);
        u.setMail(mail);
        u.setPassword(encode(password)); // Password à limiter en nb de char => cryptage peut depasser les 45 char sur bdd
        userDao.save(u);
        return "ajaxAnswer/null";
    }

    @RequestMapping("/addAdmin")
    public String addAdmin(@RequestParam(name="name") String name,
                           @RequestParam(name="mail") String mail,
                           @RequestParam(name="password") String password,
                           Model m, HttpSession session){
        m.addAttribute("status", false);
        if(!isSuperAdmin(session)){
            return "ajaxAnswer/addAdmin";
        }
        //System.out.println("before " + m);
        //System.out.println("(!addAdmin)");
        addUser(name, mail, password, m);
        //System.out.println("after " + m);
        if(!(Boolean)m.getAttribute("errorName") && !(Boolean)m.getAttribute("errorMail")){
            Admin res = new Admin();
            res.setAdminname(name);
            adminDao.save(res);
            m.addAttribute("status", true);
        }
        return "ajaxAnswer/addAdmin";
    }

    @RequestMapping("/addPlayer")
    public String addPlayer(@RequestParam(name="name") String name,
                            @RequestParam(name="mail") String mail,
                            @RequestParam(name="password") String password,
                            @RequestParam(name="passwordRepeat") String passwordRepeat,
                            Model m, HttpSession session) {
        m.addAttribute("name", name);
        m.addAttribute("mail", mail);
        if(!password.equals(passwordRepeat)){
            m.addAttribute("errorPassword", true);
            m.addAttribute("errorName", userDao.existsById(name));
            m.addAttribute("errorMail", userDao.existsByMail(mail));
            return inscription(m);
        }
        m.addAttribute("errorPassword", false);
        addUser(name, mail, password, m);
        if (!(Boolean) m.getAttribute("errorName") && !(Boolean) m.getAttribute("errorMail")) {
            Player res = new Player();
            res.setPlayername(name);
            playerDao.save(res);
            return connect(name, password, m, session);
        }
        return inscription(m);
    }

    @RequestMapping("/snakeDummy")
    public String snakeDummy(){ // comment les sessions sont gérées en spring ?
        return /*(isLoggedIn())?*/ "games/snakeDummy" /*: "signup"*/;
    }

    @RequestMapping("/removeScore")
    public String removeScore(@RequestParam(name="game") String game,
                              @RequestParam(name="playerName") String playerName,
                              HttpSession session){
        if(!isAdminOrSuperAdmin(session)){
            return "ajaxAnswer/null";
        }
        GameRank g = gameRankDao.findOneByPlayernameAndGamename(playerName, game);
        if(g != null) {
            gameRankDao.delete(g);
        }
        return "ajaxAnswer/null";
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
        updateStat(game, score, session);
        return "ajaxAnswer/null";
    }

    public void updateStat(String game, String score, HttpSession session){
        String playerName = (String) session.getAttribute("name");
        if(playerName == null || !playerDao.existsById(playerName)){
            return;
        }
        Stat k = statDao.findOneByPlayernameAndGamename(playerName, game);
        if(k == null){
            k = new Stat();
            k.setGamename(game);
            k.setPlayername(playerName);
            k.setGameplayed(0);
            k.setAveragescore(0);
        }
        k.setAveragescore((k.getGameplayed()*k.getAveragescore()+Long.valueOf(score))/((float) k.getGameplayed()+1));
        k.setGameplayed(k.getGameplayed()+1);
        statDao.save(k);
    }

    @RequestMapping("/homepage")
    public String homepage(){
        return showSession(); // A CHANGER
    }

    @RequestMapping("/connect")
    public String connect(@RequestParam(name="name") String name,
                          @RequestParam(name="password") String password,
                          Model m, HttpSession session){
        Optional<User> u = userDao.findById(name);
        boolean exist = u.isPresent();
        if(exist && matches(password, u.get().getPassword())){
            session.setAttribute("name", u.get().getName());
            return homepage();
        } else {
            m.addAttribute("name", name);
            m.addAttribute("errorName", !exist);
            // on peut deviner avec ces info si le password est incorrect, inutile de rajouter un attribut sup
            return login(m, session);
        }
    }

    @RequestMapping("/login")
    public String login(Model m, HttpSession session){
        if(null != session.getAttribute("name")){ // deja connecte
            return homepage();
        }
        return "session/login";
    }

    @RequestMapping("/disconnect")
    public String disconnect(HttpSession session){
        session.setAttribute("name", null);
        return "session/disconnect";
    }

    @RequestMapping("/inscription")
    public String inscription(Model m){
        return "session/inscription";
    }

    @RequestMapping("/localRank")
    public String localRank(@RequestParam(name="gamename") String gamename,
                            Model m, HttpSession httpSession){
        //m.addAttribute("listeLocalRank",statDao.findAll());
        String pname=(String)httpSession.getAttribute("name");

        //System.out.println("LOCAL \n NOM "+pname);

        Stat s = new Stat();
        //s.setPlayername();
        s.setAveragescore(0);
        s.setGameplayed(0);
        s.setGamename(gamename);

        if (pname == null || !playerDao.existsById(pname)){
            m.addAttribute("localRank",s);
            //System.out.println("Rank vide ajouté");
        }else{
            Stat stat = statDao.findOneByPlayernameAndGamename(pname,gamename);
            m.addAttribute("localRank",(stat == null)? s : stat);
            //System.out.println("stat ajouté");
        }

        return "ajaxAnswer/gameRankLocal";
    }

    @RequestMapping("/classement")
    public String showClassement(Model m){
        return "pages/classement";
    }

    /*@RequestMapping("classement")
    public String classement(HttpSession session, Model m){
        return "rank/classement";
    }
    */

    @RequestMapping("/globalRank")
    public String globalRank(@RequestParam(name="gamename") String gamename,
            Model m, HttpSession httpSession) {

        //List<GameRank> gameRanks = gameRankDao.findAll(Sort.by("score").descending());
        //gameRanks.removeIf(n-> (!n.getGamename().equals("snakeDummy")));

        List<GameRank> gameRanks = gameRankDao.findByGamenameOrderByScoreDescPlayernameAsc(gamename);
        //System.out.println("gameRanks SIZE"+gameRanks.size()+"gameName : "+gamename);
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
                //System.out.println("Comparing ..."+gameRanks.get(i).getPlayername());
                //System.out.println("Position user : "+indexUser+"("+pname+")");
                break;
            }else if(i==gameRanks.size()-1){
                //return ""; // si connecté mais a pas encore joué ?
                for(int k=0, l=Math.min(5,gameRanks.size()); k<l ; k++){
                    GameRankEntry g = new GameRankEntry(gameRanks.get(k),k+1);
                    gameRanksClassement.add(g);
                }
                m.addAttribute("listeGlobalRank", gameRanksClassement);
                return "ajaxAnswer/gameRankGlobal";
            }
        }
        GameRankEntry last;
        try{
            last = gameRanksClassement.last();
        } catch(NoSuchElementException e){
            last = null;
        }
        for (int i = 0; i<2*plusOuMoins+1; i++){
            int indexChercher=indexUser-plusOuMoins+i;
            //System.out.println("indexChercher:"+indexChercher);
            //System.out.println("plusOuMoins:"+plusOuMoins);
            if(i==0 && last != null && indexChercher-(last.getPosition()-1)>1 ){
                GameRankEntry g = new GameRankEntry(null,last.getPosition()+1); // apres top 3
                gameRanksClassement.add(g);
            }

            if(indexChercher>=0 && indexChercher<gameRanks.size()){
                GameRankEntry g = new GameRankEntry(gameRanks.get(indexChercher),indexChercher+1);
                gameRanksClassement.add(g);
                //System.out.println("bool "+ gameRanksClassement.add(g));
                //System.out.println("PASS g.egtPname:"+g.getGameRank().getPlayername());
            }
        }

        // vérification console du classement
        /*for (GameRankEntry k: gameRanksClassement) {
            System.out.println(k);
        }*/

        // une fois les données de classement sélectionnées on les met dans listeGlobalRank qui sera accessible en jsp
        m.addAttribute("listeGlobalRank", gameRanksClassement);

        return "ajaxAnswer/gameRankGlobal";
    }

    @RequestMapping("accessDenied")
    public String accessDenied(){
        return "session/denied";
    }

    @RequestMapping("admin")
    public String admin(HttpSession session, Model m){
        String adminName = (String) session.getAttribute("name");
        if(!isLoggedIn(session)){
            return login(m, session);
        }
        if(isAdminOrSuperAdmin(session)){
            m.addAttribute("isSuperAdmin", isSuperAdmin(session));
            return "administration/admin";
        } else {
            return accessDenied();
        }
    }


    @RequestMapping("gamesButtons")
    public String gamesButtons(Model m){
        m.addAttribute("gameList", gameDao.findAll());
        return "ajaxAnswer/gamesButtons";
    }

    @RequestMapping("requestScore")
    public String requestScore(@RequestParam(name="game") String game,
                               @RequestParam(name="pageIndex") int pageIndex,
                               @RequestParam(name="step") int step,
                               Model m, HttpSession session){
        if(!isAdminOrSuperAdmin(session)){
            return "ajaxAnswer/null";
        }
        //System.out.println("requestScore "+ game + " " + pageIndex + " " + step);
        List<GameRank> list = gameRankDao.findByGamenameOrderByScoreDescPlayernameAsc(game, PageRequest.of(pageIndex, step));
        //List<GameRank> ist = gameRankDao.findByGamename(game, PageRequest.of(startingIndex, step+1, Sort.by("score").descending().and(Sort.by("playername").ascending())));
        m.addAttribute("addNext", (pageIndex+1)*step < gameRankDao.countByGamename(game));
        //System.out.println("element received : " + list.size() /*+ " " + ist.size()*/);
        m.addAttribute("rankList", list);
        m.addAttribute("startPosition", pageIndex*step+1);

        return "ajaxAnswer/gameRankAdmin";
    }

    @RequestMapping("classementJeux")
    public String classementJeux(@RequestParam(name="game") String game,
                               @RequestParam(name="pageIndex") int pageIndex,
                               @RequestParam(name="step") int step,
                               Model m, HttpSession session){
        //System.out.println("requestScore "+ game + " " + pageIndex + " " + step);
        List<GameRank> list = gameRankDao.findByGamenameOrderByScoreDescPlayernameAsc(game, PageRequest.of(pageIndex, step));
        //List<GameRank> ist = gameRankDao.findByGamename(game, PageRequest.of(startingIndex, step+1, Sort.by("score").descending().and(Sort.by("playername").ascending())));
        m.addAttribute("addNext", (pageIndex+1)*step < gameRankDao.countByGamename(game));
        //System.out.println("element received : " + list.size() /*+ " " + ist.size()*/);
        m.addAttribute("rankList", list);
        m.addAttribute("startPosition", pageIndex*step+1);

        return "ajaxAnswer/classementJeux";
    }

    @RequestMapping("requestPlayer")
    public String requestPlayer(@RequestParam(name="pageIndex") int pageIndex,
                                @RequestParam(name="step") int step,
                                Model m, HttpSession session){
        if(!isAdminOrSuperAdmin(session)){
            return "ajaxAnswer/null";
        }
        List<Player> list = playerDao.findAll(PageRequest.of(pageIndex, step)).toList();
        m.addAttribute("addNext", (pageIndex+1)*step < playerDao.count());
        List<User> res = new ArrayList<>();
        for(Player k : list){
            res.add(userDao.getOne(k.getPlayername()));
        }
        m.addAttribute("userList", res);
        m.addAttribute("isPlayer", true);
        return "ajaxAnswer/userAdmin";
    }

    @RequestMapping("requestAdmin")
    public String requestAdmin(@RequestParam(name="pageIndex") int pageIndex,
                                @RequestParam(name="step") int step,
                                Model m, HttpSession session){
        if(!isSuperAdmin(session)){
            return "ajaxAnswer/null";
        }
        List<Admin> list = adminDao.findAll(PageRequest.of(pageIndex, step)).toList();
        m.addAttribute("addNext", (pageIndex+1)*step < adminDao.count());
        List<User> res = new ArrayList<>();
        for(Admin k : list){
            res.add(userDao.getOne(k.getAdminname()));
        }
        m.addAttribute("userList", res);
        m.addAttribute("isPlayer", false);
        return "ajaxAnswer/userAdmin";
    }
}
