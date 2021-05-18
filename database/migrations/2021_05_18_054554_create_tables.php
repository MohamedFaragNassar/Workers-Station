<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string("email");
            $table->string("password");
            $table->string("first_name");
            $table->string("last_name");
            $table->string("phone");
            $table->string("location");
            $table->string("daily_start");
            $table->string("daily_end");
        });

        Schema::create('services', function (Blueprint $table) {
            $table->string("name")->primary();
            $table->string("status")->default("active");
        });
        
        Schema::create('locations', function (Blueprint $table) {
            $table->string("name")->primary();
            $table->string("status")->default("active");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tables');
    }
}
