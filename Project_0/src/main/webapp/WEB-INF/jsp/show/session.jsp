<!DOCTYPE html>
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
            <th>values</th>
        </tr>
        <tr>
            <th>name</th>
            <th><%=session.getAttribute("name")%></th>
        </tr>
    </table>
</body>
</html>