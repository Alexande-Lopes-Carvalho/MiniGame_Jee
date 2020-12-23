package net.app.main.controller;

import net.app.main.dao.*;
import net.app.main.model.GameRank;
import net.app.main.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
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
            gameRankDao.save(k); // modification de l'element dans la table si deja existant ou ajout
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
}
