import { Heading } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Tabs,
  Timeline,
  Table,
  List,
  Statistic,
  Progress,
  Button,
  Divider,
  Space,
  Tooltip,
  Badge,
  Avatar,
  Row,
  Col,
  Alert,
  Empty,
} from "antd";
import {
  FaArrowLeft,
  FaEdit,
  FaPrint,
  FaSignOutAlt,
  FaUserInjured,
  FaNotesMedical,
  FaHeartbeat,
  FaFlask,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import type { ColumnsType } from "antd/es/table";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Critical":
      return "red";
    case "Operation":
      return "purple";
    case "Observation":
      return "orange";
    case "Discharged":
      return "green";
    case "Admitted":
    default:
      return "blue";
  }
};

const INR = (n: number | string) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
    : "-";

interface Vital {
  date: string;
  heartRate: number;
  bp: string;
  temp: number;
  spo2: number;
}

interface Medication {
  name: string;
  dose: string;
  route: string;
  frequency: string;
  startDate: string;
  status: string;
}

interface LabResult {
  testName: string;
  date: string;
  result: string;
  unit: string;
  flag: string;
}

interface ClinicalNote {
  date: string;
  author: string;
  note: string;
}

interface BillingItem {
  desc: string;
  amount: number;
  status: string;
}

interface PatientData {
  name: string;
  age: number;
  gender: string;
  ward: string;
  bed: string;
  status: string;
  admittedOn: string;
  bloodGroup: string;
  allergies: string[];
  attendingDoctor: string;
  diagnosis: string;
  phone: string;
  emergencyContact: string;
  insuranceProvider: string;
  policyNo: string;
  vitals: Vital[];
  medications: Medication[];
  labs: LabResult[];
  notes: ClinicalNote[];
  billing: {
    total: number;
    paid: number;
    items: BillingItem[];
  };
}

const mockPatients: Record<string, PatientData> = {
  "P-1001": {
    name: "Rahul Kumar",
    age: 32,
    gender: "Male",
    ward: "General - 12A",
    bed: "12A",
    status: "Admitted",
    admittedOn: "2025-08-10",
    bloodGroup: "B+",
    allergies: ["Penicillin"],
    attendingDoctor: "Dr. R. Mehta",
    diagnosis: "Community-acquired pneumonia",
    phone: "9876543210",
    emergencyContact: "Sunita (Wife) - 9876500011",
    insuranceProvider: "ABC Insurance",
    policyNo: "ABC-12345",
    vitals: [
      { date: "2025-09-12 09:00", heartRate: 88, bp: "128/84", temp: 98.6, spo2: 97 },
      { date: "2025-09-11 20:00", heartRate: 92, bp: "130/86", temp: 99.2, spo2: 96 },
      { date: "2025-09-11 08:00", heartRate: 85, bp: "124/80", temp: 98.4, spo2: 98 },
    ],
    medications: [
      { name: "Azithromycin", dose: "500 mg", route: "PO", frequency: "OD", startDate: "2025-09-10", status: "Active" },
      { name: "Paracetamol", dose: "650 mg", route: "PO", frequency: "SOS", startDate: "2025-09-10", status: "Active" },
      { name: "Ondansetron", dose: "4 mg", route: "IV", frequency: "BD", startDate: "2025-09-11", status: "Stopped" },
    ],
    labs: [
      { testName: "CBC", date: "2025-09-11", result: "WBC 12.5", unit: "x10^9/L", flag: "H" },
      { testName: "CRP", date: "2025-09-11", result: "24", unit: "mg/L", flag: "H" },
      { testName: "Chest X-Ray", date: "2025-09-10", result: "Patchy consolidation RLL", unit: "", flag: "N" },
    ],
    notes: [
      { date: "2025-09-12 09:15", author: "Dr. Mehta", note: "Patient improving, continue antibiotics. Repeat CRP tomorrow." },
      { date: "2025-09-11 19:30", author: "Nursing", note: "T max 99.4°F, sponging done, medications given." },
      { date: "2025-09-11 08:10", author: "Dr. Mehta", note: "Added IV fluids, monitor input/output." },
    ],
    billing: {
      total: 82000,
      paid: 50000,
      items: [
        { desc: "Admission Charges", amount: 5000, status: "Paid" },
        { desc: "Room Rent (3 days)", amount: 18000, status: "Paid" },
        { desc: "Investigation Charges", amount: 12000, status: "Unpaid" },
        { desc: "Pharmacy", amount: 15000, status: "Unpaid" },
        { desc: "Doctor Visit", amount: 32000, status: "Unpaid" },
      ],
    },
  },
  "P-1002": {
    name: "Anita Sharma",
    age: 45,
    gender: "Female",
    ward: "ICU - 3B",
    bed: "ICU-3B",
    status: "Critical",
    admittedOn: "2025-08-20",
    bloodGroup: "O+",
    allergies: [],
    attendingDoctor: "Dr. S. Nair",
    diagnosis: "Severe Acute Respiratory Distress",
    phone: "9876543221",
    emergencyContact: "Rajesh (Husband) - 9876500022",
    insuranceProvider: "LIC Health",
    policyNo: "LIC-7890",
    vitals: [],
    medications: [],
    labs: [],
    notes: [],
    billing: { total: 0, paid: 0, items: [] }
  },
};

const PatientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = id ? mockPatients[id] : null;

  const vitalsColumns: ColumnsType<Vital> = [
    { title: "Date/Time", dataIndex: "date", key: "date" },
    { title: "Heart Rate", dataIndex: "heartRate", key: "heartRate", align: "center", render: (v) => (v ? `${v} bpm` : "-") },
    { title: "BP", dataIndex: "bp", key: "bp", align: "center" },
    { title: "Temp", dataIndex: "temp", key: "temp", align: "center", render: (t) => (t ? `${t} °F` : "-") },
    {
      title: "SpO₂",
      dataIndex: "spo2",
      key: "spo2",
      align: "center",
      render: (s: number) => (typeof s === "number" ? <Tag color={s < 94 ? "red" : "green"}>{s}%</Tag> : "-"),
    },
  ];

  const medsColumns: ColumnsType<Medication> = [
    { title: "Medication", dataIndex: "name", key: "name" },
    { title: "Dose", dataIndex: "dose", key: "dose", align: "center" },
    { title: "Route", dataIndex: "route", key: "route", align: "center" },
    { title: "Frequency", dataIndex: "frequency", key: "frequency", align: "center" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate", align: "center" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (t: string) => <Tag color={t === "Active" ? "green" : "default"}>{t || "-"}</Tag>,
    },
  ];

  const labsColumns: ColumnsType<LabResult> = [
    { title: "Test", dataIndex: "testName", key: "testName" },
    { title: "Date", dataIndex: "date", key: "date", align: "center" },
    {
      title: "Result",
      key: "result",
      render: (_, r) => (
        <Space>
          <span>{r.result}</span>
          {r.unit ? <span className="text-gray-500">({r.unit})</span> : null}
          {r.flag === "H" ? <Badge color="red" text="High" /> : r.flag === "L" ? <Badge color="volcano" text="Low" /> : <Badge color="green" text="Normal" />}
        </Space>
      ),
    },
  ];

  const billingColumns: ColumnsType<BillingItem> = [
    { title: "Item", dataIndex: "desc", key: "desc" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (v: number) => INR(v),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (t: string) => <Tag color={t === "Paid" ? "green" : "gold"}>{t}</Tag>,
    },
  ];

  const lastVitals = data?.vitals?.[0];
  const totalBill = data?.billing?.total ?? 0;
  const paidBill = data?.billing?.paid ?? 0;
  const dueBill = Math.max(totalBill - paidBill, 0);
  const paidPct = totalBill ? Math.min(Math.round((paidBill / totalBill) * 100), 100) : 0;

  return (
    <>
      <Heading title={"Patient Profile"} />
      <div className="p-1 px-2 mvh-100">
        {!id ? (
          <div className="rounded border p-4 bg-white">
            <Alert
              message="No patient selected"
              description="Select a patient from the list to view details."
              type="info"
              showIcon
            />
          </div>
        ) : !data ? (
          <div className="rounded border p-4 bg-white">
            <Alert
              message="Patient not found"
              description={`No record found for Patient ID: ${id}`}
              type="error"
              showIcon
              action={
                <Button size="small" onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button icon={<FaArrowLeft />} onClick={() => navigate(-1)}>
                Back
              </Button>
              <Space>
                <Tooltip title="Edit profile">
                  <Button icon={<FaEdit />} disabled>
                    Edit
                  </Button>
                </Tooltip>
                <Tooltip title="Print summary">
                  <Button icon={<FaPrint />} disabled>
                    Print
                  </Button>
                </Tooltip>
                <Tooltip title={data.status === "Discharged" ? "Already discharged" : "Discharge patient"}>
                  <Button type="primary" icon={<FaSignOutAlt />} disabled={data.status === "Discharged"}>
                    Discharge
                  </Button>
                </Tooltip>
              </Space>
            </div>

            <Card bordered>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={4} className="flex justify-center">
                  <Avatar size={80} style={{ backgroundColor: "#1677ff" }} icon={<FaUserInjured />} />
                </Col>
                <Col xs={24} md={20}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="text-lg font-semibold">{data.name}</div>
                      <div className="text-gray-500">Patient ID: {id}</div>
                    </div>
                    <Tag color={getStatusColor(data.status)} style={{ fontSize: 12, padding: "4px 10px" }}>
                      {data.status}
                    </Tag>
                  </div>
                  <Divider className="my-2" />
                  <Descriptions size="small" column={{ xs: 1, sm: 2, md: 3 }}>
                    <Descriptions.Item label="Age/Gender">
                      {data.age} / {data.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Admitted On">{data.admittedOn || "-"}</Descriptions.Item>
                    <Descriptions.Item label="Ward/Bed">{data.ward || "-"}{data.bed ? ` (${data.bed})` : ""}</Descriptions.Item>
                    <Descriptions.Item label="Attending Doctor">{data.attendingDoctor || "-"}</Descriptions.Item>
                    <Descriptions.Item label="Diagnosis">{data.diagnosis || "-"}</Descriptions.Item>
                    <Descriptions.Item label="Blood Group">{data.bloodGroup || "-"}</Descriptions.Item>
                    <Descriptions.Item label="Allergies">
                      {Array.isArray(data.allergies) && data.allergies.length
                        ? data.allergies.map((a) => <Tag key={a}>{a}</Tag>)
                        : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact">{data.phone || "-"}</Descriptions.Item>
                    <Descriptions.Item label="Emergency Contact">{data.emergencyContact || "-"}</Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card size="small" title={<Space><FaFileInvoiceDollar /> Billing Summary</Space>}>
                  <Row gutter={8}>
                    <Col span={8}>
                      <Statistic title="Total" value={totalBill} formatter={(v) => INR(v)} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="Paid" value={paidBill} formatter={(v) => INR(v)} />
                    </Col>
                    <Col span={8}>
                      <Statistic title="Due" value={dueBill} formatter={(v) => INR(v)} valueStyle={{ color: dueBill ? "#faad14" : "#52c41a" }} />
                    </Col>
                  </Row>
                  <div className="mt-2">
                    <Progress percent={paidPct} status={dueBill ? "active" : "success"} />
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" title={<Space><FaHeartbeat /> Recent Vitals</Space>}>
                  {lastVitals ? (
                    <List size="small" split={false}>
                      <List.Item>
                        <Space className="w-full justify-between">
                          <span className="text-gray-500">Recorded</span>
                          <span>{lastVitals.date}</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space className="w-full justify-between">
                          <span className="text-gray-500">HR</span>
                          <span>{lastVitals.heartRate} bpm</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space className="w-full justify-between">
                          <span className="text-gray-500">BP</span>
                          <span>{lastVitals.bp}</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space className="w-full justify-between">
                          <span className="text-gray-500">Temp</span>
                          <span>{lastVitals.temp} °F</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space className="w-full justify-between">
                          <span className="text-gray-500">SpO₂</span>
                          <Tag color={lastVitals.spo2 < 94 ? "red" : "green"}>{lastVitals.spo2}%</Tag>
                        </Space>
                      </List.Item>
                    </List>
                  ) : (
                    <Empty description="No vitals recorded" />
                  )}
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" title={<Space><FaNotesMedical /> Insurance</Space>}>
                  <List size="small" split={false}>
                    <List.Item>
                      <Space className="w-full justify-between">
                        <span className="text-gray-500">Provider</span>
                        <span>{data.insuranceProvider || "-"}</span>
                      </Space>
                    </List.Item>
                    <List.Item>
                      <Space className="w-full justify-between">
                        <span className="text-gray-500">Policy No</span>
                        <span>{data.policyNo || "-"}</span>
                      </Space>
                    </List.Item>
                    <List.Item>
                      <Space className="w-full justify-between">
                        <span className="text-gray-500">Status</span>
                        <Badge color="processing" text="Pending pre-auth" />
                      </Space>
                    </List.Item>
                  </List>
                </Card>
              </Col>
            </Row>

            <Card>
              <Tabs
                defaultActiveKey="overview"
                items={[
                  {
                    key: "overview",
                    label: (
                      <Space>
                        <FaNotesMedical /> Overview
                      </Space>
                    ),
                    children: (
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Card size="small" title="Clinical Notes">
                            {Array.isArray(data.notes) && data.notes.length ? (
                              <List
                                itemLayout="vertical"
                                dataSource={data.notes}
                                renderItem={(n, idx) => (
                                  <List.Item key={idx}>
                                    <List.Item.Meta
                                      title={
                                        <Space>
                                          <Badge status="processing" />
                                          <span>{n.author}</span>
                                          <span className="text-gray-500">{n.date}</span>
                                        </Space>
                                      }
                                      description={n.note}
                                    />
                                  </List.Item>
                                )}
                              />
                            ) : (
                              <Empty description="No notes" />
                            )}
                          </Card>
                        </Col>
                        <Col xs={24} md={12}>
                          <Card size="small" title="Recent Events">
                            <Timeline
                              items={[
                                ...(data.labs || []).slice(0, 3).map((l) => ({
                                  color: l.flag === "H" ? "red" : l.flag === "L" ? "orange" : "green",
                                  children: (
                                    <Space>
                                      <FaFlask />
                                      <span>{l.testName} - {l.date}</span>
                                    </Space>
                                  ),
                                })),
                                ...(data.notes || []).slice(0, 2).map((n) => ({
                                  color: "blue",
                                  children: (
                                    <Space>
                                      <FaNotesMedical /> <span>{n.author}</span> <span className="text-gray-500">{n.date}</span>
                                    </Space>
                                  ),
                                })),
                              ]}
                            />
                          </Card>
                        </Col>
                      </Row>
                    ),
                  },
                  {
                    key: "vitals",
                    label: (
                      <Space>
                        <FaHeartbeat /> Vitals
                      </Space>
                    ),
                    children: (
                      <Table
                        rowKey={(_, i) => i ?? 0}
                        columns={vitalsColumns}
                        dataSource={data.vitals || []}
                        pagination={{ pageSize: 5 }}
                        bordered
                      />
                    ),
                  },
                  {
                    key: "meds",
                    label: (
                      <Space>
                        <FaNotesMedical /> Medications
                      </Space>
                    ),
                    children: (
                      <Table
                        rowKey={(_, i) => i ?? 0}
                        columns={medsColumns}
                        dataSource={data.medications || []}
                        pagination={{ pageSize: 5 }}
                        bordered
                      />
                    ),
                  },
                  {
                    key: "labs",
                    label: (
                      <Space>
                        <FaFlask /> Investigations
                      </Space>
                    ),
                    children: (
                      <Table
                        rowKey={(_, i) => i ?? 0}
                        columns={labsColumns}
                        dataSource={data.labs || []}
                        pagination={{ pageSize: 5 }}
                        bordered
                      />
                    ),
                  },
                  {
                    key: "billing",
                    label: (
                      <Space>
                        <FaFileInvoiceDollar /> Billing
                      </Space>
                    ),
                    children: (
                      <>
                        <Row gutter={[16, 16]} className="mb-4">
                          <Col xs={24} md={8}>
                            <Card size="small">
                              <Statistic title="Total Bill" value={totalBill} formatter={(v) => INR(v)} />
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card size="small">
                              <Statistic title="Paid" value={paidBill} formatter={(v) => INR(v)} />
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card size="small">
                              <Statistic title="Pending" value={dueBill} formatter={(v) => INR(v)} valueStyle={{ color: dueBill ? "#faad14" : "#52c41a" }} />
                            </Card>
                          </Col>
                        </Row>
                        <Table
                          rowKey={(_, i) => i ?? 0}
                          columns={billingColumns}
                          dataSource={data.billing?.items || []}
                          pagination={{ pageSize: 5 }}
                          bordered
                        />
                      </>
                    ),
                  },
                ]}
              />
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientProfile;