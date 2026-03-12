<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            ['name' => 'Иванов Иван Иванович',    'email' => 'ivanov@example.com'],
            ['name' => 'Петрова Анна Сергеевна',   'email' => 'petrova@example.com'],
            ['name' => 'Сидоров Михаил Юрьевич',   'email' => 'sidorov@example.com'],
            ['name' => 'Козлова Елена Викторовна',  'email' => 'kozlova@example.com'],
            ['name' => 'Новиков Дмитрий Алексеевич','email' => 'novikov@example.com'],
        ];

        foreach ($clients as $client) {
            Client::firstOrCreate(['email' => $client['email']], $client);
        }
    }
}
