<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../../resources/assets/css/Registration-Form-with-Photo.css">
    <title>Inscription</title>
</head>
<body>
    <div id="headerFooterImport"></div>
    <div id="header"></div>
    <!-- Fond d'écran -->
    <div class="register-photo" style="height: 815px;background: url(&quot;../../resources/assets/img/SI_3DSVC_SuperMarioBros_image1600w.jpg&quot;);background-size: cover;">
        <!-- Formulaire -->
        <%
            String name = (String)request.getAttribute("name");
            String mail = (String)request.getAttribute("mail");
            Boolean errorMail = (Boolean)request.getAttribute("errorMail");
            Boolean errorName = (Boolean)request.getAttribute("errorName");
            Boolean errorPassword = (Boolean)request.getAttribute("errorPassword");
        %>
        <div class="form-container">
            <form action="addPlayer" method="post">
                <!-- Titre du formulaire -->
                <h2 class="text-center"><strong>Création de compte</strong></h2>
                <!-- Input du formualaire -->
                <div class="form-group">
                    <input class="form-control" type="email" name="mail" placeholder="Email" value="<%=(mail != null)? mail : ""%>" required>
                    <div id="errorMail" style="color:#ff0000;font-size:x-small;">
                        <%= (errorMail != null && errorMail)? "L'adresse email saisie est assignée à un autre compte" : ""%>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" name="name" placeholder="Nickname" value="<%=(name != null)? name : ""%>" required>
                    <div id="errorName" style="color:#ff0000;font-size:x-small;">
                        <%= (errorName != null && errorName)? "Le nom saisie existe déjà" : ""%>
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="password" maxlength="15" minlength="1" placeholder="Password" required>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="passwordRepeat" maxlength="15" minlength="1" placeholder="Password (repeat)" required>
                    <div id="errorPassword" style="color:#ff0000;font-size:x-small;">
                        <%= (errorPassword != null && errorPassword)? "Le mot de passe répété est different du mot de passe saisie" : ""%>
                    </div>
                </div>
                <!-- Bouton pour envoyer la requête -->
                <div class="form-group"><button class="btn btn-primary btn-block" type="submit" style="background: rgb(4,154,73);">Sign Up</button></div>
                <!-- Bouton pour se connecter (redirecte vers la page connexion) -->
                <a class="already" href="login">Tu as déjà un compte? Connecte toi ici.</a>
            </form>
        </div>
    </div>
    <div id="footer"></div>
    <script src="../../resources/js/auxiliary/operations.js"></script>
</body>
</html>