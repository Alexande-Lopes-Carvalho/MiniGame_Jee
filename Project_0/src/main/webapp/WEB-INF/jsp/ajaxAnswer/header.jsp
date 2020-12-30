<%@ page import="net.app.main.model.Game" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- Header -->
<nav class="navbar navbar-light navbar-expand-md navigation-clean-button" style="padding: 5px;background: #39cd04;">
    <div class="container">
        <!-- Logo du site -->
        <img src="../../../resources/assets/img/logo.png" style="height: 65px;margin: 0px;">
        <!-- nom du site -->
        <a class="navbar-brand" href="homepage" style="padding: 5px 15px;">Mini-jeux-fun.fr</a>
        <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <!-- Navigation dans le header -->
        <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="nav navbar-nav mr-auto">
                <li class="nav-item"></li>
                <li class="nav-item"></li>
                <li class="nav-item dropdown">
                    <div class="dropdown-menu" style="background: rgb(255,255,255);color: rgb(0,0,0);"><a class="dropdown-item" href="#">Log In</a><a class="dropdown-item" href="#">Sign Up</a>
                        <div class="dropdown-divider"></div>
                        <h6 class="dropdown-header" style="font-size: 20px;background: #ffffff;">Jeux</h6>
                        <a class="dropdown-item" href="#">Snake<br></a>
                        <a class="dropdown-item" href="#">Démineur<br></a>
                        <a class="dropdown-item" href="#">Timber Man<br></a>
                        <a class="dropdown-item" href="#">Flappy Bird</a>
                    </div>
                </li>
            </ul>
            <span class="navbar-text actions">
                <% if((Boolean)request.getAttribute("isLoggedIn")){
                    if((Boolean)request.getAttribute("isAdminOrSuperAdmin")) { %>
                            <a class="btn btn-light action-button" role="button" href="admin" style="font-weight: bold;">Modération</a>
                        <% } %>
                <!-- Bouton disconnect -->
                        <a class="btn btn-light action-button" role="button" href="disconnect" style="background-color: red;">Disconnect</a>
                <% } else { %>
                <!-- Bouton de connexion -->
                    <a class="login" href="login" style="font-weight: bold;">Log In</a>
                <!-- Bouton d'inscription -->
                    <a class="btn btn-light action-button" role="button" href="inscription">Sign Up</a>
                <% } %>
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
                <% List<Game> list = (List<Game>) request.getAttribute("gameList");
                    for(Game k : list) {
                %>
                <li class="nav-item"><a class="nav-link" href="<%=k.getName()%>" style="font-weight: bold;"><%=k.getName()%></a></li>
                <%}%>
            </ul>
            <form action="classement">
                <button class="btn btn-primary pull-right" type="submit">Classements</button>
            </form>
            <form class="form-inline mr-auto" target="_self">
                <div class="form-group"><label for="search-field"></label></div>
            </form>
        </div>
    </div>
</nav>
<!-- Fin barre de navigation -->