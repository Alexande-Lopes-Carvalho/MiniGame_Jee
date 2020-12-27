package com.main.test.controller;

import com.main.test.dao.EtudiantDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerWeb {
    @Autowired
    private EtudiantDao etudiantDao;

    @RequestMapping("/")
    public String showStart(){
        return "homePage";
    }

    @RequestMapping("/homePage")
    public String show(){
        return "homePage";
    }

    @RequestMapping("/info")
    public String showEtudiant(Model model){
            model.addAttribute("etudiants", etudiantDao.findAll());
            return "info";
    }
}
