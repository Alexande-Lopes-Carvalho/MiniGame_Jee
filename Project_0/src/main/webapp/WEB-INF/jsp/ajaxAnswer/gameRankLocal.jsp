<%@ page import="net.app.main.model.Stat" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Classement Local</title>
</head>
<body>

<table border="1">
    <tr>
        <th>Jeu</th>
        <th>Nombre de parties jouées</th>
        <th>Moyenne scores</th>
    </tr>
    <% Stat s = (Stat) request.getAttribute("localRank");%>

    <tr>
        <th><%= s.getGamename() %></th>
        <th><%= s.getGameplayed()%></th>
        <th><%= s.getAveragescore() %></th>
    </tr>
</table>


</body>
</html>