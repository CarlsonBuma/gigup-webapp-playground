<?php

namespace App\Models;

use App\Models\Cockpit;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\Contracts\OAuthenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements OAuthenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'public.users';
    protected $fillable = [
        
        // Account
        'name',
        'avatar',
        'email',
        'password',
        
        // Flags
        'is_public',
        'email_verified_at',
        'archived',

        // Access
        'token',
        'google_id',
        'google_avatar',
    ];

    protected $hidden = [
        'password',
        'token',
        'google_id'
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'email_verified_at' => 'datetime',
            'archived' => 'datetime',
        ];
    }

    /**
     * Undocumented function
     *
     * @return HasOne
     */
    public function has_cockpit(): HasOne
    {
        return $this->hasOne(Cockpit::class, 'user_id');
    }
}
