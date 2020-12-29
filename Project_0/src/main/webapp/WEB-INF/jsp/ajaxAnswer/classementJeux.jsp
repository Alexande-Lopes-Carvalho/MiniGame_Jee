<%@ page import="net.app.main.model.GameRank" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%  List<GameRank> list = (List<GameRank>) request.getAttribute("rankList");
    int startPosition = (Integer) request.getAttribute("startPosition");
    boolean addNext = (Boolean) request.getAttribute("addNext");
    for(int i = 0; i < list.size(); i++) { %>
<tr>
    <th><%=startPosition+i%></th>
    <th><%=list.get(i).getPlayername()%></th>
    <th><%=list.get(i).getScore()%></th>
</tr>
<% }
    if(addNext){%>
<tr id="addNextClassement">
    <th>...</th>
    <th><a onclick="nextClassement()">Next</a></th>
    <th>...</th>
</tr>
<%   }%>