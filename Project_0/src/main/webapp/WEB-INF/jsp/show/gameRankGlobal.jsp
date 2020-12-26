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
        <th>Place</th>
        <th>playername</th>
        <th>score</th>
    </tr>
    <c:forEach items="${listeGlobalRank}" var="e" varStatus="c">
        <tr>
            <th>${e}</th>
            <th>${e}</th>
            <th>${e}</th>
        </tr>
    </c:forEach>
</table>


</body>
</html>