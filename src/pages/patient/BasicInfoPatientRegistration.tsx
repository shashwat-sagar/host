import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  message,
} from "antd";
import { Heading } from "../../components";
import dayjs from "dayjs";

const { TextArea } = Input;
export const calculateAge = (dob: dayjs.Dayjs | null) => {
    if (!dob) return null;

    const today = dayjs();
    let age = today.year() - dob.year();

    // If birthday not yet occurred this year
    if (
      today.month() < dob.month() ||
      (today.month() === dob.month() && today.date() < dob.date())
    ) {
      age--;
    }

    return age;
  };

const BasicInfoPatientRegistration = () => {
  const [form] = Form.useForm();
  const idProofValue = Form.useWatch("idProof", form);

  return (
    <>
      <Heading title={"Patient Registration"} />
      <div className="p-2 px-4 mvh-100 shadow-lg rounded-md bg-white">
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => {
            console.log("Final Payload:", values);
            message.success("Patient registered successfully!");
          }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Patient Name (as per ID)"
                name="patientName"
                rules={[
                  { required: true, message: "Patient name is required" },
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only alphabets allowed",
                  },
                ]}
              >
                <Input placeholder="Patient Name" size="large" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  { required: true, message: "Date of Birth is required" },
                ]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    return current && current > dayjs().endOf("day");
                  }}
                  onChange={(value) => {
                    const age = calculateAge(value);
                    form.setFieldsValue({ age });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Age is required" }]}
              >
                <InputNumber
                  min={0}
                  max={120}
                  disabled
                  placeholder="Age"
                  size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select
                  size="large"
                  placeholder="Select gender"
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Transgender", value: "Transgender" },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Father’s / Husband’s / Guardian’s Name"
                name="guardianName"
                rules={[
                  {
                    pattern: /^[A-Za-z ]+$/,
                    message: "Only alphabets allowed",
                  },
                ]}
              >
                <Input placeholder="Guardian Name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Email Id"
                name="email"
                rules={[
                  // { required: true, message: "Email is required" },
                  { type: "email", message: "Enter a valid email address" },
                ]}
              >
                <Input placeholder="Email Id" size="large" type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Contact No."
                name="contactNo"
                rules={[
                  { required: true, message: "Contact number is required" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                ]}
              >
                <Input
                  prefix="+91"
                  placeholder="Contact No."
                  size="large"
                  maxLength={10}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="ID Proof"
                name="idProof"
                rules={[{ required: true, message: "ID Proof is required" }]}
              >
                <Select
                  size="large"
                  placeholder="Select ID Proof"
                  options={[
                    { label: "Aadhaar", value: "Aadhaar" },
                    { label: "Voter ID", value: "Voter ID" },
                    { label: "PAN", value: "PAN" },
                    { label: "Driving License", value: "Driving License" },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </Form.Item>
            </Col>
            {idProofValue === "Other" && (
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Specify Other ID Proof"
                  name="otherIdProof"
                  rules={[
                    { required: true, message: "Please specify ID proof" },
                    { min: 3, message: "Must be at least 3 characters" },
                  ]}
                >
                  <Input placeholder="Enter ID Proof name" size="large" />
                </Form.Item>
              </Col>
            )}
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="ID Number" name="idNumber">
                <Input placeholder="ID Number" size="large" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={12} lg={8}>
              <Form.Item label="Marital Status" name="maritalStatus">
                <Select
                  size="large"
                  placeholder="Select Marital Status"
                  options={[
                    { label: "Single", value: "Single" },
                    { label: "Married", value: "Married" },
                    { label: "Widow", value: "Widow" },
                    { label: "Divorced", value: "Divorced" },
                  ]}
                />
              </Form.Item>
            </Col> */}

            {/* <Col xs={24} md={12} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { max: 250, message: "Address too long (max 250 chars)" },
                ]}
              >
                <TextArea rows={4} placeholder="Address" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={24} className="flex items-center justify-center">
              <Button
                className="w-50"
                type="primary"
                size="large"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default BasicInfoPatientRegistration;
