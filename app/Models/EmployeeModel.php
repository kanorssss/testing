<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeModel extends Model
{
    //
    protected $fillable = [
        'name',
        'email',
        'position'
    ];
}
