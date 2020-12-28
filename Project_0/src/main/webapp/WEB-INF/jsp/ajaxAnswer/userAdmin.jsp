<%@ page import="net.app.main.model.GameRank" %>
<%@ page import="java.util.List" %>
<%@ page import="net.app.main.model.User" %>


<%  List<User> list = (List<User>) request.getAttribute("userList");
    boolean addNext = (Boolean) request.getAttribute("addNext"), isPlayer = (Boolean) request.getAttribute("isPlayer");
    for(int i = 0; i < list.size(); i++) { %>
        <tr>
            <th><%=list.get(i).getName()%></th>
            <th><%=list.get(i).getMail()%></th>
            <th><a onclick="removeUser('<%=list.get(i).getName()%>')">Ban</a></th>
        </tr>
    <% }
        if(addNext){%>
        <tr id=<%=(isPlayer)? "addNextPlayer" : "addNextAdmin"%>>
            <th>...</th>
            <th><a onclick="<%=(isPlayer)?"nextPlayer()": "nextAdmin()"%>">Next</a></th>
            <th>...</th>
        </tr>
   <%   }%>