const dynamic="force-static";
const revalidate=5;
import con from "../../lib/conn.js";
import EMS from "../../models/employee.js";
import EmployeeManagementPage from "./comp";
import { Employee} from "./comp";



export default async function Management(){
  await con();
  const docs:Employee[] = await EMS.find({}).lean();
  const data:Employee[]= JSON.parse(JSON.stringify(docs));
  console.log(data);
  return(
    <EmployeeManagementPage data={data}/>
  )
}
