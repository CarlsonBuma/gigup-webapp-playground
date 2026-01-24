<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            
            // Account
            $table->id();
            $table->string('name');
            $table->string('avatar', 255)->nullable();
            $table->string('email')->unique();
            $table->string('password');
            
            // Access
            $table->string('token')->nullable();
            $table->string('google_id')->nullable()->unique();
            $table->string('google_avatar')->nullable();
            
            // Flags
            $table->timestamp('email_verified_at')->nullable(); 
            $table->boolean('is_public')->default(false);
            $table->timestamp('archived')->nullable();              // Flag
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
