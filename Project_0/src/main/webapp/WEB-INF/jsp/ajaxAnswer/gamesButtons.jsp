<%@ page import="net.app.main.model.Game" %>
<%@ page import="java.util.List" %>

<% List<Game> list = (List<Game>) request.getAttribute("gameList");
    for(Game k : list){ %>
    <button id="<%=k.getName()%>" onclick="selectGame(this)"><%=k.getName()%></button>
<% } %>