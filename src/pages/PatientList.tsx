import { Heading, MasterTable, ScreenWrapper } from "../components";
import { useNavigate } from "react-router-dom";
import { Button, Table, Tag } from "antd";
import { FaArrowRight } from "react-icons/fa";
import type { ColumnsType } from "antd/es/table";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admittedOn: string;
  ward: string;
  status: string;
}

const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Rahul Kumar",
    age: 32,
    gender: "Male",
    admittedOn: "2025-08-10",
    ward: "General - 12A",
    status: "Admitted",
  },
  {
    id: "P-1002",
    name: "Anita Sharma",
    age: 45,
    gender: "Female",
    admittedOn: "2025-08-20",
    ward: "ICU - 3B",
    status: "Critical",
  },
  {
    id: "P-1003",
    name: "Amit Verma",
    age: 27,
    gender: "Male",
    admittedOn: "2025-09-01",
    ward: "Private - 102",
    status: "Observation",
  },
  {
    id: "P-1004",
    name: "Meera Joshi",
    age: 38,
    gender: "Female",
    admittedOn: "2025-09-05",
    ward: "General - 7C",
    status: "Discharged",
  },
  {
    id: "P-1005",
    name: "Sanjay Patel",
    age: 51,
    gender: "Male",
    admittedOn: "2025-09-12",
    ward: "Surgery - OT",
    status: "Operation",
  },
  {
    id: "P-1006",
    name: "Shivam Kumar",
    age: 31,
    gender: "Male",
    admittedOn: "2025-08-11",
    ward: "General - 12A",
    status: "Admitted",
  },
  {
    id: "P-1007",
    name: "Shuyashi Sharma",
    age: 45,
    gender: "Female",
    admittedOn: "2025-08-20",
    ward: "ICU - 3B",
    status: "Critical",
  },
  {
    id: "P-1008",
    name: "Anand Sahu",
    age: 27,
    gender: "Male",
    admittedOn: "2025-09-01",
    ward: "Private - 102",
    status: "Observation",
  },
  {
    id: "P-1009",
    name: "Meera Joshi",
    age: 38,
    gender: "Female",
    admittedOn: "2025-09-05",
    ward: "General - 7C",
    status: "Discharged",
  },
  {
    id: "P-1010",
    name: "Sanjay Patel",
    age: 51,
    gender: "Male",
    admittedOn: "2025-09-12",
    ward: "Surgery - OT",
    status: "Operation",
  },
];

const PatientList = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<Patient> = [
    {
      title: "Sr. No",
      key: "index",
      width: 70,
      render: (_t, _r, index) => index + 1,
    },
    { title: "Patient ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", align: "center", dataIndex: "age", key: "age" },
    { title: "Gender", align: "center", dataIndex: "gender", key: "gender" },
    {
      title: "Admitted On",
      align: "center",
      dataIndex: "admittedOn",
      key: "admittedOn",
    },
    {
      title: "Ward/Room",
      align: "center",
      dataIndex: "ward",
      key: "ward",
      render: (text: string) => (
        <Tag
          color={
            text.includes("ICU")
              ? "red"
              : text.includes("OT")
                ? "blue"
                : text.includes("Private")
                  ? "orange"
                  : "green"
          }
        >
          {text}
        </Tag>
      ),
    },
    { title: "Status", align: "center", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Button
          size="small"
          type="primary"
          onClick={() => navigate(`/auth/patientprofile/${record.id}`)}
        >
          View <FaArrowRight size={10} className="ml-1" />
        </Button>
      ),
    },
  ];

  return (
    <ScreenWrapper title={"Patient List"}>
      <MasterTable
        rowKey="id"
        columns={columns}
        bordered
        data={patients}
        pagination={{ pageSize: 5 }}
      />
    </ScreenWrapper>
  );
};

export default PatientList;
