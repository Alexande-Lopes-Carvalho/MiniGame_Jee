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
            <th>name</th>
            <th>mail</th>
            <th>password</th>
        </tr>
        <c:forEach items="${listUser}" var="e">
            <tr>
                <th>${e.name}</th>
                <th>${e.mail}</th>
                <th>${e.password}</th>
            </tr>
        </c:forEach>
    </table>

</body>
</html>