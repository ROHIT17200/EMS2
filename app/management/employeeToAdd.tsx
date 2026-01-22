"use server"

import con from "../../lib/conn.js";
import EMS from "../../models/employee.js";

interface newEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
}

export default async function updateEmployee(data: newEmployee) {
  await con();
  await EMS.create(data); 
}