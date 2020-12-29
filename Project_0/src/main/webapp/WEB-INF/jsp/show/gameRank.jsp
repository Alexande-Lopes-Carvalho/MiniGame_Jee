<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <table border="1">
        <tr>
            <th>idgamerank</th>
            <th>playername</th>
            <th>gamename</th>
            <th>score</th>
            <th>time</th>
        </tr>
        <c:forEach items="${listGameRank}" var="e">
            <tr>
                <th>${e.idgamerank}</th>
                <th>${e.playername}</th>
                <th>${e.gamename}</th>
                <th>${e.score}</th>
                <th>${e.time}</th>
            </tr>
        </c:forEach>
    </table>

</body>
</html>