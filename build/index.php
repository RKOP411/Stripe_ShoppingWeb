<html>
<?php
require_once("header.html");
require_once("stripe.php");
?>

<head>
    <link rel="icon" href="../src/img/favicon.ico">
</head>

<body>
    <div class="card-body" style="padding:10dvh;"><!-- body -->
        <div class="container text-center">
            <div class="row align-items-center">

                <div class="col">
                    <div data-id="1" class="card-item">
                        <div class="card" style="width:18rem;">
                            <img src="../src/img/Red.png" class="card-img-top" alt="..." style="height: 200px;width:auto;">
                            <div class="card-body">
                                <h5 class="card-title">Red - $50</h5>
                                <p class="card-text">of the colour of fresh blood.</p>
                                <!-- <a href="#" class="btn btn-primary" id="Add-Cart">Add to Cart</a> -->
                                <a href="#" class="btn btn-primary" id="Add-Cart" name="Add-Cart">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col">
                    <div data-id="2" class="card-item" name="item">
                        <div class="card" style="width: 18rem;">
                            <img src="../src/img/Yellow.png" class="card-img-top" alt="..." style="height: 200px;width:auto;">
                            <div class="card-body">
                                <h5 class="card-title">Yellow - $40</h5>
                                <p class="card-text">a colour like that of a lemon or gold or the sun.</p>
                                <a href="#" class="btn btn-primary" id="Add-Cart" name="Add-Cart">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div data-id="3" class="card-item" name="item">
                        <div class="card" style="width: 18rem;">
                            <img src="../src/img/Blue.png" class="card-img-top" alt="..." style="height: 200px;width:auto;">
                            <div class="card-body">
                                <h5 class="card-title">Blue - $60</h5>
                                <p class="card-text">of the colour of the sky without clouds on a bright day.</p>
                                <a href="#" class="btn btn-primary" id="Add-Cart" name="Add-Cart">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!--body-->
</body>
<script src="bundle.js"></script>

</html>