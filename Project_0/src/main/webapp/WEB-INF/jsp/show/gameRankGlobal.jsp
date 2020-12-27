<%@ page import="net.app.main.auxiliary.GameRankEntry" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.TreeSet" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Classement Global</title>
</head>
<body>

<table border="1">
    <tr>
        <th>Position</th>
        <th>Nom</th>
        <th>Score</th>
    </tr>
    <% TreeSet<GameRankEntry> l = (TreeSet<GameRankEntry>) request.getAttribute("listeGlobalRank");
        for(GameRankEntry k : l){ %>
    <% if(k.getGameRank()==null){%>
    <tr>
        <th>...</th>
        <th>...</th>
        <th>...</th>
    </tr>
    <%}else{ %>

    <% if(k.getGameRank().getPlayername().equals(session.getAttribute("name"))){ %>
    <tr style="color: darkorange">
        <% }else{%>
        <tr>
        <% }%>
        <th><%= k.getPosition() %></th>
        <th><%= k.getGameRank().getPlayername()%></th>
        <th><%= k.getGameRank().getScore() %></th>
    </tr>
    <%  } %>
    <%  } %>
</table>



</body>
</html>