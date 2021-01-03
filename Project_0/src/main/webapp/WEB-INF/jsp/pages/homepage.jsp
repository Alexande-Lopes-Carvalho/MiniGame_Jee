<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <title>Page d'accueil</title>
</head>
<body>
<div id="headerFooterImport"></div>
<div id="header"></div>
<!-- Heading présentation site -->
<div class="projects-clean" style="background: #002b7f;">
    <div class="container align-self-center" style="background: #ffffff;">
        <h1 style="text-align: center;padding: 33px;"><strong>Bienvenue dans le site Mini-jeux-fun.fr</strong><br></h1>
        <!-- Fin Heading -->

        <!-- Propositions des jeux avec leur description et leur logo  -->
        <div class="row projects" style="border-color: rgb(255,255,255);background: #ffffff;">
            <div class="col-sm-6 col-lg-4 item" onclick="location.href='Snake'">
                <img class="img-fluid" src="../../resources/assets/img/snake.jpg" style="height: 181px;" />
                <h3 class="name">Snake</h3>
                <p class="description">Le snake est un jeu dans lequel le joueur dirige un serpent. Le joueur doit donc manger le plus possible pour faire grandir son serpent. Mais gare à ne pas te mordre la queue !</p>
            </div>
            <div class="col-sm-6 col-lg-4 item" onclick="location.href='Démineur'">
                <img class="img-fluid" src="../../resources/assets/img/demineur.png" style="height: 181px;" />
                <h3 class="name">Démineur</h3>
                <p class="description">Le démineur est un jeu de réflexion. Le joueur doit donc trouver toutes les mines présentes dans la grille le plus vite possible sans les faire exploser.</p>
            </div>
            <div class="col-sm-6 col-lg-4 item" onclick="location.href='TimberMan'">
                <img class="img-fluid" src="../../resources/assets/img/timberMan.png" style="text-align: center;">
                <h3 class="name">Timber Man</h3>
                <p class="description">Le Timber Man est un jeu casual. Le joueur doit couper le plus bois possible sans se faire toucher par une branche.&nbsp;</p>
            </div>
        </div>
    </div>
</div>
<!-- Fin présentation des jeux -->
<div id="footer"></div>
<script src="../../resources/js/auxiliary/operations.js"></script>
</body>
</html>