"use server"

import con from "../../lib/conn.js";
import EMS from "../../models/employee.js";

export default async function deleteRecord(id:string){
    await con();
    await EMS.findByIdAndDelete(id);
    console.log("Employee Deleted successfully");
}