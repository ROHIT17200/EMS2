"use server"

import con from "../../lib/conn.js";
import EMS from "../../models/employee.js";

interface UpdateEmployeeInput {
  _id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
}

export default async function updateEmployee(data: UpdateEmployeeInput) {
  await con();
  const { _id, ...updateData } = data;
  await EMS.findByIdAndUpdate(
    _id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
}