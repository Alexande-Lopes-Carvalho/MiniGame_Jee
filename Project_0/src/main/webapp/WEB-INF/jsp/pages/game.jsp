<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js"></script>-->
    <link rel="stylesheet" href="../../../resources/assets/css/Bootstrap-4---Table-Fixed-Header.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-1.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-2.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-3.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="../../resources/assets/css/Login-Form-Clean.css">
    <link rel="stylesheet" href="../../resources/assets/css/Login-Form-Dark.css">
    <title><%=(String)request.getAttribute("gameName")%></title>
</head>
<body>
    <div id="headerFooterImport"></div>
    <div id="header"></div>
    <!-- Le nom du jeu -->
    <div>
        <h1 id="gameName" style="text-align: center"><%=(String)request.getAttribute("gameName")%></h1>
    </div>
    <!-- Div pour le JS -->
    <div id="sketchHolder" style="margin: 0; display: flex;justify-content: center; align-items: center">
    </div>
    <div>
        <h1 style="text-align: center; padding: 21px; margin: 12px 0px">Classements</h1>
        <!-- Barre navigation pour switcher le classement -->
        <nav class="navbar navbar-light navbar-expand-md navigation-clean-search" style="padding: 0px;background: #ffffff;">
            <div class="container">
                <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-2"><span class="sr-only">Toggle navigation</span><span
                        class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navcol-2" style="height: 115px;width: 1162px;">
                    <ul class="nav navbar-nav">
                        <li class="nav-item">
                            <!-- Le bouton pour le classement local  -->
                            <a class="nav-link border rounded-pill" id="buttonLocal" onclick="changerRank(0)" style="font-weight: bold;background: #ff0000;border-style: solid;">Classement local</a></li>
                        <li class="nav-item">
                            <!-- Le bouton pour le classement mondial  -->
                            <a class="nav-link border rounded-pill" id="buttonMondial" onclick="changerRank(1)" style="font-weight: bold;background: #ffb800;border-style: solid;filter: brightness(101%) saturate(94%);">Classement mondial</a></li>
                        <li class="nav-item"></li>
                        <li class="nav-item"></li>
                    </ul>
                    <form class="form-inline mr-auto" target="_self">
                        <div class="form-group"><label for="search-field"></label></div>
                    </form>
                </div>
            </div>
        </nav>
        <div id="classement"> <!-- -->
        </div>
    </div>
    <div id="footer"></div>
    <script src="../../resources/js/auxiliary/operations.js"></script>
    <script src="../../resources/js/games/gameOperations.js"></script>
    <script src="../../resources/js/games/<%=(String)request.getAttribute("gameName")%>.js"></script>
</body>
</html>