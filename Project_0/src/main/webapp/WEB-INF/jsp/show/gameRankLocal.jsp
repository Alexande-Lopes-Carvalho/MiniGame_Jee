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
        <th>idstat</th>
        <th>playername</th>
        <th>gamename</th>
        <th>gameplayed</th>
        <th>averagescore</th>
    </tr>
    <c:forEach items="${listeLocalRank}" var="e">
        <tr>
            <th>${e.idstat}</th>
            <th>${e.playername}</th>
            <th>${e.gamename}</th>
            <th>${e.gameplayed}</th>
            <th>${e.averagescore}</th>
        </tr>
    </c:forEach>
</table>

</body>
</html>