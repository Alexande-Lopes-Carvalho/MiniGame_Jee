<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <table border="1">
        <tr>
            <th>superadminname</th>
        </tr>
        <c:forEach items="${listSuperAdmin}" var="e">
            <tr>
                <th>${e.superadminname}</th>
            </tr>
        </c:forEach>
    </table>

</body>
</html>