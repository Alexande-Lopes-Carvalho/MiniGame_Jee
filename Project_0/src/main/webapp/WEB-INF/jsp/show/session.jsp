<!DOCTYPE html>
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