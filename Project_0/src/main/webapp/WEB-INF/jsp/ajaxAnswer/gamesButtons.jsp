<%@ page import="net.app.main.model.Game" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% List<Game> list = (List<Game>) request.getAttribute("gameList");
    for(Game k : list){ %>
    <button id="<%=k.getName()%>" onclick="selectGame(this)"><%=k.getName()%></button>
<% } %>