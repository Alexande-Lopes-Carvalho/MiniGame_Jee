<!DOCTYPE html>
<html>

<head>
    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Page d'accueil</title>
    <!-- CSS -->
    <link rel="stylesheet" href="../../resources/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface">
    <link rel="stylesheet" href="../../resources/assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="../../resources/assets/css/Footer-Dark.css">
    <link rel="stylesheet" href="../../resources/assets/css/Navigation-with-Button.css">
    <link rel="stylesheet" href="../../resources/assets/css/Navigation-with-Search.css">
    <link rel="stylesheet" href="../../resources/assets/css/Projects-Clean.css">
    <link rel="stylesheet" href="../../resources/assets/css/styles.css">
</head>

<body>
    <!-- Header -->
    <nav class="navbar navbar-light navbar-expand-md navigation-clean-button" style="padding: 5px;background: #39cd04;">
        <div class="container">
            <!-- Logo du site -->
            <img src="../../resources/assets/img/logo.png" style="height: 65px;margin: 0px;">
            <!-- nom du site -->
            <a class="navbar-brand" href="#" style="padding: 5px 15px;">Mini-jeux-fun.fr</a>
            <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <!-- Navigation dans le header -->
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="nav navbar-nav mr-auto">
                    <li class="nav-item"></li>
                    <li class="nav-item"></li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#" style="font-style: normal;font-weight: bold;">Menu</a>
                        <div class="dropdown-menu" style="background: rgb(255,255,255);color: rgb(0,0,0);"><a class="dropdown-item" href="#">Log In</a><a class="dropdown-item" href="#">Sign Up</a>
                            <div class="dropdown-divider"></div>
                            <h6 class="dropdown-header" style="font-size: 20px;background: #ffffff;">Jeux</h6><a class="dropdown-item" href="#">Snake<br></a><a class="dropdown-item" href="#">Démineur<br></a><a class="dropdown-item" href="#">Timber Man<br></a><a class="dropdown-item" href="#">Flappy Bird</a></div>
                    </li>
                </ul><span class="navbar-text actions">
                <!-- Bouton de connexion -->
                <a class="login" href="#" style="font-weight: bold;">Log In</a>
                <!-- Bouton d'inscription -->
                <a class="btn btn-light action-button" role="button" href="#">Sign Up</a>
            </span>
            </div>
        </div>
    </nav>
    <!-- Fin du header -->

    <!-- Barre de navigation -->
    <nav class="navbar navbar-light navbar-expand-md navigation-clean-search" style="padding: 0px;background: #66d7d7;">
        <div class="container"><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1" style="height: 39px;width: 1162px;">
                <ul class="nav navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="#" style="font-weight: bold;">Snake</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" style="font-weight: bold;">Démineur</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" style="font-weight: bold;">Timber Man</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" style="font-weight: bold;">Flappy Bird</a></li>
                </ul>
                <form class="form-inline mr-auto" target="_self">
                    <div class="form-group"><label for="search-field"></label></div>
                </form>
                <!-- Bouton recherche -->
                <i class="fa fa-search" style="padding: 10px;"></i>
                <!-- input de recherche -->
                <input type="search" id="search-field" class="search-field" name="search" style="margin: 2px;height: 30px;padding: 0px;"></div>
        </div>
    </nav>
    <!-- Fin barre de navigation -->

    <!-- Heading présentation site -->
    <div class="projects-clean" style="background: #002b7f;">
        <div class="container align-self-center" style="background: #ffffff;">
            <h1 style="text-align: center;padding: 33px;"><strong>Bienvenue dans le site Mini-jeux-fun.fr</strong><br></h1>
            <!-- Fin Heading -->

            <!-- Propositions des jeux avec leur description et leur logo  -->
            <div class="row projects" style="border-color: rgb(255,255,255);background: #ffffff;"><div class="col-sm-6 col-lg-4 item"><img class="img-fluid" src="../../resources/assets/img/snake.jpg" style="height: 181px;" />
    <h3 class="name">Snake</h3>
    <p class="description">Le snake est un jeu dans lequel le joueur dirige un serpent. Le joueur doit donc manger le plus possible pour faire grandir son serpent. Mais gare à ne pas te mordre la queue !</p>
</div><div class="col-sm-6 col-lg-4 item"><img class="img-fluid" src="../../resources/assets/img/demineur.png" style="height: 181px;" />
    <h3 class="name">Démineur</h3>
    <p class="description">Le démineur est un jeu de réflexion. Le joueur doit donc trouver toutes les mines présentes dans la grille le plus vite possible sans les faire exploser.</p>
</div>
                <div class="col-sm-6 col-lg-4 item"><img class="img-fluid" src="../../resources/assets/img/timberMan.png" style="text-align: center;">
                    <h3 class="name">Timber Man</h3>
                    <p class="description">Le Timber Man est un jeu casual. Le joueur doit couper le plus bois possible sans se faire toucher par une branche.&nbsp;</p>
                </div>
                <div class="col-sm-6 col-lg-4 item" style="border-color: rgb(255,255,255);"><img class="img-fluid" src="../../resources/assets/img/flappyBird.png">
                    <h3 class="name">Flappy Bird</h3>
                    <p class="description">Flappy Bird est un jeu d'obstacle développé par Nguyen Ha Dong. Le gameplay repose sur l'agilité du joueur. Le but faire avancer l'oiseau le plus loin possible sans toucher les tuyaux.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Fin présentation des jeux -->

    <!-- Footer -->
    <div class="footer-dark">
        <p style="margin: 0px;text-align: center;"><br>Created by Mehdi BOUKELMOUN, Thomas LESCOTET, Alexandre LOPES CAVALHO.<br></p>
        <footer>
            <div class="container">
                <p class="copyright">Mini-jeu © 2020</p>
            </div>
        </footer>
    </div>
    <!-- Fin footer -->

    <script src="../../resources/assets/js/jquery.min.js"></script>
    <script src="../../resources/assets/bootstrap/js/bootstrap.min.js"></script>
</body>

</html>