<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="classement">
        Classement
        <div id="classementButtons">

        </div>
            <table id="classementData" border="1">
                <tr>
                    <th>Place</th>
                    <th>Nom</th>
                    <th>Score</th>
                    <th>Temps</th>
                    <th>Remove</th>
                    <th>Ban</th>
                </tr>
            </table>
    </div>
    <div id="player">
        Joueur
        <table id="playerData" border="1">
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Ban</th>
            </tr>
        </table>
    </div>
    <script>var isSuperAdmin = false;</script>
    <% if((Boolean)request.getAttribute("isSuperAdmin")) { %>
       <script>isSuperAdmin = true;</script>
       <div id="admin">
           Admin
           <table id="adminData" border="1">
               <tr>
                   <th>Nom</th>
                   <th>Email</th>
                   <th>Ban</th>
               </tr>
           </table>
           <form onsubmit="addAdmin();return false;" method="post">
               nickname : <input type="text" id="addAdminName" name="name" required><br>
               <div id="errorAdminName" style="color:#ff0000;font-size:x-small;"></div><br>
               email : <input type="email" id="addAdminMail" size="30" name="mail" required><br>
               <div id="errorAdminEmail" style="color:#ff0000;font-size:x-small;"></div><br>
               password : <input type="password" id="addAdminPassword" maxlength="15" minlength="1" name="password" required><br>
               <div id="errorAdminPassword" style="color:#ff0000;font-size:x-small;"></div><br>
               <input type="submit" value="submit"><br>
               <div id="resultAdminName" style="color:#00ff00;font-size:x-small;"></div>
           </form>
       </div>
    <% } %>
    <script src="../../resources/js/administration/adminOperations.js"></script>
</body>
</html>