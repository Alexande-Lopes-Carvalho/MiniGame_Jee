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
            <th>playername</th>
        </tr>
        <c:forEach items="${listPlayer}" var="e">
            <tr>
                <th>${e.playername}</th>
            </tr>
        </c:forEach>
    </table>

</body>
</html>