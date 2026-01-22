import dotenv from 'dotenv'; // Note: You need the full import now

// Calculate the path to the project root directory
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The .env file is 3 levels up from the current file's directory:
// init.js -> Init/SE/init.js
// .env is in -> Simply-Saral_next/
const envPath = resolve(__dirname, '../.env'); 

dotenv.config({ path: envPath });

import connection from "../lib/conn.js";
import EMS from "../models/employee.js"

const data = [
  {
    name: 'Amit Sharma',
    email: 'amit.sharma@company.com',
    department: 'engineering',
    position: 'Senior Developer',
    salary: '₹18,00,000',
    hireDate: '2024-03-15',
    status: 'active',
  },
  {
    name: 'Neha Verma',
    email: 'neha.verma@company.com',
    department: 'hr',
    position: 'HR Manager',
    salary: '₹12,00,000',
    hireDate: '2023-11-20',
    status: 'active',
  },
  {
    name: 'Rahul Mehta',
    email: 'rahul.mehta@company.com',
    department: 'finance',
    position: 'Accountant',
    salary: '₹8,50,000',
    hireDate: '2024-01-10',
    status: 'on-leave',
  },
  {
    name: 'Priya Nair',
    email: 'priya.nair@company.com',
    department: 'marketing',
    position: 'Marketing Lead',
    salary: '₹10,00,000',
    hireDate: '2023-09-05',
    status: 'active',
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    department: 'sales',
    position: 'Sales Executive',
    salary: '₹6,50,000',
    hireDate: '2024-06-12',
    status: 'inactive',
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@company.com',
    department: 'engineering',
    position: 'Junior Developer',
    salary: '₹5,50,000',
    hireDate: '2024-08-01',
    status: 'active',
  },
];


const InsertData=async()=>{
    connection();
    await EMS.deleteMany();
    await EMS.insertMany(data);
}
InsertData()