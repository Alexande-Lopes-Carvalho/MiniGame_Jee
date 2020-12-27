<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Title</title>
</head>
<body>
<table border="1">
    <tr>
        <th>id</th>
        <th>nom</th>
        <th>prenom</th>
        <th>classe</th>
        <th>age</th>
    </tr>
    <c:forEach items="${etudiants}" var="etudiant">
        <tr>
            <th>${etudiant.idEtudiant}ééé</th>
            <th>${etudiant.nom}</th>
            <th>${etudiant.prenom}</th>
            <th>${etudiant.classe}</th>
            <th>${etudiant.age}</th>
        </tr>
    </c:forEach>
</table>
</body>
</html>