import con from "../../lib/conn.js";
import EMS from "../../models/employee.js";
import EmployeeManagementPage from "./comp";
import { Employee} from "./comp";



export default async function Management(){
  await con();
  const docs:Employee[] = await EMS.find({}).lean();
  const data:Employee[]= JSON.parse(JSON.stringify(docs));
  return(
    <EmployeeManagementPage data={data}/>
  )
}