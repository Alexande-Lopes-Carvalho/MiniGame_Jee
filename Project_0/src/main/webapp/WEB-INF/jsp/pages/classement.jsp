<%@ page import="net.app.main.auxiliary.GameRankEntry" %>
<%@ page import="java.util.TreeSet" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../../../resources/assets/css/Bootstrap-4---Table-Fixed-Header.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-1.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-2.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-3.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Login-Form-Clean.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Login-Form-Dark.css">
</head>
<body>
    <div id="headerFooterImport"></div>
    <div id="header"></div>
    <h1 style="text-align: center; padding: 21px; margin: 12px 0px">Classements</h1>
    <!-- Barre navigation pour switcher le classement -->
    <nav class="navbar navbar-light navbar-expand-md navigation-clean-search" style="padding: 0px; height:235px; background: #ffffff;">
        <div class="container"><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-2"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse text-center d-flex justify-content-center align-items-center align-content-center align-self-center" id="navcol-2" style="height: 115px;width: 1162px;">
                <ul id="classementButtons" class="nav navbar-nav">
                </ul>
            </div>
        </div>
    </nav>

<div id="classement">
    <!--<div id="classementButtons">

    </div>-->


    <table class="table table-striped table-bordered" cellspacing="0" width="100%"
           style="text-align: center; width: 100%; ">
        <tr>
            <th>Position</th>
            <th>Nom</th>
            <th>Score</th>
        </tr>
        <tbody id="classementData">

        </tbody>
    </table>
</div>
    <div id="footer"></div>
    <script src="../../resources/js/auxiliary/operations.js"></script>
    <script src="../../resources/js/auxiliary/classementOperations.js"></script>
</body>
</html>