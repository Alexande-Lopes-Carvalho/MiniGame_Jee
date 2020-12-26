<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Toutes les entrées de la table GameRank</title>
</head>
<body>
<table border="1">
    <tr>
        <th>Placeuh</th>
        <th>playername</th>
        <th>gamename</th>
        <th>score</th>
    </tr>
    <c:forEach items="${listeFullGlobalRank}" var="l" varStatus="c">
        <tr>
            <th>${c.count}</th>
            <th>${l.playername}</th>
            <th>${l.gamename}</th>
            <th>${l.score}</th>
        </tr>
    </c:forEach>
</table>
</body>
</html>