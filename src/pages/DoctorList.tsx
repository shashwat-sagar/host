import { useNavigate } from "react-router-dom";
import { MasterTable, ScreenWrapper } from "../components";
import { Button, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { doctors, Doctor } from "../data/doctorsData";



const DoctorList = () => {
  const navigate = useNavigate();


  const columns: ColumnsType<Doctor> = [
    { title: "#", align: "center", key: "index", width: 60, render: (_t, _r, index) => index + 1 },
    { title: "Name", dataIndex: "name", key: "name", width: 180 },
    {
      title: "Specialization", align: "center", dataIndex: "specialization", key: "specialization", width: 150, render: (specs: string[]) => (
        <div>
          {specs.map((spec, index) => (
            <Tag key={index} color="blue">{spec}</Tag>
          ))}
        </div>
      )
    },
    { title: "Department", align: "center", dataIndex: "department", key: "department", width: 150 },
    { title: "Phone", align: "center", dataIndex: "contactNo", key: "contactNo", width: 130 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    {
      title: "Experience",
      align: "center",
      dataIndex: "totalExperience",
      key: "experience",
      width: 100,
      render: (exp) => `${exp} years`
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/auth/doctor-profile/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <ScreenWrapper title="Doctor List">
    
          <MasterTable
            rowKey="id"
            columns={columns}
            data={doctors}
            bordered />
      
    </ScreenWrapper>
  );

}



export default DoctorList;
