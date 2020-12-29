<%@ page import="net.app.main.auxiliary.GameRankEntry" %>
<%@ page import="java.util.TreeSet" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--
<div id="classement">
    Classement
    <div id="classementButtons">

    </div>
    <table id="classementData" border="1">
        <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Score</th>
        </tr>
    </table>
</div>
-->
<div id="classement">
    Classement
    <div id="classementButtons">

    </div>


    <table id="classementData" border="1" class="table table-striped table-bordered" cellspacing="0" width="100%"
           style="text-align: center; width: 20%; ">
        <tr>
            <th>Position</th>
            <th>Nom</th>
            <th>Score</th>
        </tr>

    </table>
</div>

<script src="../../resources/js/administration/classementOperations.js"></script>
</body>
</html>