<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime("starts_at");
            $table->integer("total_price");
            $table->integer("amount");
            $table->string("status")->default("pending");
            $table->string("image");
            $table->date("date")->useCurrent();
            $table->foreignId('seller_id')->constrained();
            $table->foreignId('client_id')->constrained();
            $table->foreignId('service_name')->constrained();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
