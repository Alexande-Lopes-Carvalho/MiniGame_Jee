<%@ page import="net.app.main.model.Stat" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Classement Local</title>
</head>
<body>

<table border="1" class="table table-striped table-bordered" cellspacing="0" width="100%"
       style="text-align: center; width: 100%; ">
    <tr>
        <th>Nombre de parties jouées</th>
        <th>Moyenne scores</th>
    </tr>
    <% Stat s = (Stat) request.getAttribute("localRank");%>

    <tr>
        <th><%= s.getGameplayed()%></th>
        <th><%= s.getAveragescore() %></th>
    </tr>
</table>


</body>
</html>