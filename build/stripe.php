<script>
    //console.log($("#Cart-Item-Total").text());
</script>

<?php
require_once '../vendor/autoload.php';
require_once '../src/stripeSecretKey.php';
$stripe = new \Stripe\StripeClient($stripeSecretKey);
\Stripe\Stripe::setApiKey($stripeSecretKey);
$YOUR_DOMAIN = 'http://localhost/stripe_work/build';
function console($msg)
{
    echo "<script>console.log('" . $msg . "');</script>";
}

/*$data = json_decode(file_get_contents("php://input"), true);
$data["total"];*/
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_COOKIE["total"])) {
        $total = $_COOKIE["total"];
    } else {
        $total = 0;
    }
    if ($total > 0) {
        if (isset($_POST["CheckOut"])) {
            $HK_total = $total * 100;
            console($total);

            $item = $stripe->products->create([
                'name' => 'item',
            ]);

            $item_price = $stripe->prices->create([
                'unit_amount' => $HK_total,
                'currency' => 'hkd',
                'product' => $item->id,
            ]);


            $checkout_session = \Stripe\Checkout\Session::create([
                'line_items' => [[
                    'price' =>  $item_price->id,
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => $YOUR_DOMAIN . '/success.php',
                'cancel_url' => $YOUR_DOMAIN . '/stripe.php',
            ]);
            header("HTTP/1.1 303 See Other");
            header("Location: " . $checkout_session->url);
        }
    }
}
?>