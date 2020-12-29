<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../../resources/assets/css/Login-Form-Clean.css">
    <link rel="stylesheet" href="../../resources/assets/css/Login-Form-Dark.css">
    <title>Connexion</title>
</head>
<body>
    <div id="headerFooterImport"></div>
    <div id="header"></div>
    <div class="login-clean" style="height: 824px;background: url(&quot;../../resources/assets/img/2013-11-22_13-13-07.0.jpg&quot;);background-size: cover;">
        <!-- Formulaire -->
        <%
            String name = (String)request.getAttribute("name");
            Boolean errorName = (Boolean)request.getAttribute("errorName");
        %>
        <form action="connect" method="post">
            <!-- Image de au dessus des champs -->
            <div class="illustration"><img src="../../resources/assets/img/RPO.jpg" style="height: 135px;"></div>
            <!-- les imputs -->
            <div class="form-group">
                <input id="name" class="form-control" placeholder="nickname" type="text" name="name" maxlength="40" value="<%=(name != null)? name : ""%>" required><br>
                <div id="errorName" style="color:#ff0000;font-size:x-small;">
                    <%= (errorName != null && errorName)? "Le nom saisie n'existe pas" : ""%>
                </div>
            </div>
            <div class="form-group">
                <input id="password" class="form-control" placeholder="password" type="password" maxlength="15" minlength="1" name="password" required><br>
                <div id="errorPassword" style="color:#ff0000;font-size:x-small;">
                    <%= (errorName != null && !errorName)? "Le mot de passe est incorrecte" : ""%>
                </div>
            </div>
            <!-- Bouton pour soumettre la requête -->
            <div class="form-group"><button class="btn btn-primary btn-block" type="submit" style="background: rgb(4,154,73);">Log In</button></div>
            <!-- Bouton oublie de mot de passe -->
            <a class="forgot" href="#">Mot de passe oublié? Click ici.</a>
        </form>
    </div>
    <div id="footer"></div>
    <script src="../../resources/js/auxiliary/operations.js"></script>
</body>
</html>