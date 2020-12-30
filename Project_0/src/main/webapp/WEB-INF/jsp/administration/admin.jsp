<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <link rel="stylesheet" href="../../../resources/assets/css/Bootstrap-4---Table-Fixed-Header.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-1.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-2.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table-3.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Data-Table.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Login-Form-Clean.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Login-Form-Dark.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Projects-Clean.css">
    <link rel="stylesheet" href="../../../resources/assets/css/styles.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Table-With-Search-1.css">
    <link rel="stylesheet" href="../../../resources/assets/css/Table-With-Search.css">
</head>
<body>
    <div id="headerFooterImport"></div>
    <div id="header"></div>
    <h1 style="text-align: center;font-size: 60px;">Page des administrateurs</h1>
    <div>
        <h1 class="text-center" style="height: 0px;padding: 35px;font-size: 26px;margin: 0px;margin-right: 0px;margin-left: 0px;">Gérer les Classements</h1>
        <!-- Barre de navigation pour changer le classement-->
        <nav class="navbar navbar-light navbar-expand-md navigation-clean-search" style="padding: 0px;background: #ffffff;">
            <div class="container">
                <div class="collapse navbar-collapse text-center d-flex justify-content-center align-items-center align-content-center align-self-center" id="navcol-2" style="height: 115px;width: 1162px;padding: 0px;margin: 23px;">
                    <ul id="classementButtons" class="nav navbar-nav">
                    </ul>
                </div>
            </div>
        </nav>
        <br><br>

        <div class="py-9 align-content-center ">
            <div class="row" >
                <div class="col-lg-7 m-auto bg-white rounded shadow" style="text-align: center;">

                    <div class="table-responsive" style="height:500px; overflow:auto;">
                        <table  class="table table-striped" >
                            <thead>
                            <tr>
                                <th>Position</th>
                                <th>Nom</th>
                                <th>Score</th>
                                <th>Temps</th>
                                <th>Remove</th>
                                <th>Bannir</th>
                            </tr>
                            </thead>
                            <tbody id="classementData"></tbody>
                        </table>
                    </div><!-- End -->

                </div>
            </div>
        </div>
    </div>

    <div>
        <h1 class="text-center" style="height: 0px;padding: 35px;font-size: 26px;margin: 0px;margin-right: 0px;margin-left: 0px;">Gérer les Joueurs</h1>
        <br><br>
        <div class="py-9 align-content-center ">
            <div class="row" >
                <div class="col-lg-7 m-auto bg-white rounded shadow" style="text-align: center;">

                    <div class="table-responsive" style="height:500px; overflow:auto;">
                        <table class="table table-striped" >
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody id="playerData"></tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <script>var isSuperAdmin = false;</script>
    <% if((Boolean)request.getAttribute("isSuperAdmin")) { %>
       <script>isSuperAdmin = true;</script>

        <div>
            <h1 class="text-center" style="height: 0px;padding: 35px;font-size: 26px;margin: 0px;margin-right: 0px;margin-left: 0px;">Gérer les Administrateurs</h1>
            <br><br>
            <div class="py-9 align-content-center ">
                <div class="row" >
                    <div class="col-lg-7 m-auto bg-white rounded shadow" style="text-align: center;">

                        <div class="table-responsive" style="height:500px; overflow:auto;">
                            <table class="table table-striped" >
                                <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Remove</th>
                                </tr>
                                </thead>
                                <tbody id="adminData"></tbody>
                            </table>
                        </div><!-- End -->

                    </div>
                </div>
            </div>

        </div>
        <br><br>
        <div class="register-photo">
            <div class="form-container">
                <form onsubmit="addAdmin();return false;" method="post">
                    <h2 class="text-center">Ajouter des Administrateurs</h2>
                    <br><br>
                    <div class="align-content-center m-auto" style="width: 908px;">
                        <div class="form-group">
                            <!-- input email -->
                            <input class="form-control" type="email" id="addAdminMail" size="30" name="mail" required placeholder="Email"><br>
                            <div id="errorAdminEmail" style="color:#ff0000;font-size:x-small;"></div><br>
                        </div>

                        <div class="form-group">
                            <!-- input nickname -->
                            <input class="form-control" type="text" id="addAdminName" name="name" maxlength="40" required placeholder="Nickname"><br>
                            <div id="errorAdminName" style="color:#ff0000;font-size:x-small;"></div><br>
                        </div>
                        <div class="form-group">
                            <!-- input password -->
                            <input class="form-control" type="password" id="addAdminPassword" maxlength="15" minlength="1" name="password" required placeholder="Password"><br>
                            <div id="errorAdminPassword" style="color:#ff0000;font-size:x-small;"></div><br>
                            <div id="resultAdminName" style="color:#00ff00;font-size:x-small;margin:auto;"></div>
                        </div>

                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block m-auto" type="submit" style="background: rgb(4,154,73); width: 97px">Ajouter</button><br>
                    </div>
                </form>
            </div>
        </div>

    <% } %>
    <div id="footer"></div>
    <script src="../../resources/js/auxiliary/operations.js"></script>
    <script src="../../resources/js/administration/adminOperations.js"></script>
</body>
</html>