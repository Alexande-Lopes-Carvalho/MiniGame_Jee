<%@ page import="net.app.main.model.Game" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% List<Game> list = (List<Game>) request.getAttribute("gameList");
    for(int i = 0; i < list.size(); i++){
        Game k = list.get(i);%>
        <li class="nav-item">
        <a id="<%=k.getName()%>" onclick="selectGame(this)" class="nav-link text-center border rounded-pill align-self-center" href="#" style="font-weight: bold;background: hsl(<%=200*(i/(float)(list.size()-1))%>,100%, 50%);border-style: solid;filter: brightness(101%) saturate(94%);margin: 0px;"><%=k.getName()%></a></li>

<% } %>