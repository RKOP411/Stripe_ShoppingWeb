<?php
require_once '../vendor/autoload.php';
require_once 'stripeSecretKey.php';

$stripe = new \Stripe\StripeClient($stripeSecretKey);
$TEST = $stripe->products->update(
  'prod_item5784',
  ['metadata' => ['order_id' => '6735']]
);

echo $TEST;
