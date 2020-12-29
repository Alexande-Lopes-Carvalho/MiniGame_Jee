<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- Header -->
<nav class="navbar navbar-light navbar-expand-md navigation-clean-button" style="padding: 5px;background: #39cd04;">
    <div class="container">
        <!-- Logo du site -->
        <img src="../../../resources/assets/img/logo.png" style="height: 65px;margin: 0px;">
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
                <a class="login" href="login" style="font-weight: bold;">Log In</a>
            <!-- Bouton d'inscription -->
                <a class="btn btn-light action-button" role="button" href="inscription">Sign Up</a>
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
        </div>
    </div>
</nav>
<!-- Fin barre de navigation -->