import { Row, Col, Form, Input, DatePicker, Select, InputNumber } from "antd";
import dayjs from "dayjs";
import { calculateAge } from "../patient/BasicInfoPatientRegistration";

const DoctorInfoStep = () => {
  const [form] = Form.useForm();
  return (
    <Form layout="vertical" form={form}>
      <Row gutter={[24, 16]}>
        {/* Doctor Name */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Doctor Name (as per Medical Council)"
            name="doctorName"
            rules={[
              { required: true, message: "Doctor name is required" },
              {
                pattern: /^[A-Za-z ]+$/,
                message: "Only alphabets and spaces allowed",
              },
            ]}
          >
            <Input placeholder="Doctor Name" size="large" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Date of Birth is required" }]}
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

        {/* Gender */}
        <Col xs={24} md={8}>
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
                { label: "Other", value: "Other" },
              ]}
            />
          </Form.Item>
        </Col>

        {/* Email */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Email Id"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="Email Id" size="large" />
          </Form.Item>
        </Col>

        {/* Contact No */}
        <Col xs={24} md={8}>
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
            <Input placeholder="Contact No." size="large" maxLength={10} />
          </Form.Item>
        </Col>

        {/* Alternate Contact */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Alternate Contact No."
            name="alternateContact"
            rules={[
              {
                pattern: /^[6-9]\d{9}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            ]}
          >
            <Input
              placeholder="Alternate Contact No."
              size="large"
              maxLength={10}
            />
          </Form.Item>
        </Col>

        {/* Aadhaar */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Aadhaar Number"
            name="aadhaarNumber"
            rules={[
              { required: true, message: "Aadhaar number is required" },
              {
                pattern: /^\d{12}$/,
                message: "Aadhaar must be a 12-digit number",
              },
            ]}
          >
            <Input placeholder="Aadhaar Number" size="large" maxLength={12} />
          </Form.Item>
        </Col>

        {/* PAN */}
        <Col xs={24} md={8}>
          <Form.Item
            label="PAN Number"
            name="panNumber"
            rules={[
              {
                pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Enter a valid PAN number (e.g. ABCDE1234F)",
              },
            ]}
          >
            <Input placeholder="PAN Number" size="large" maxLength={10} />
          </Form.Item>
        </Col>

        {/* Marital Status */}
        <Col xs={24} md={8}>
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
        </Col>

        {/* Addresses */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Permanent Address"
            name="permanentAddress"
            rules={[{ max: 250, message: "Max 250 characters allowed" }]}
          >
            <Input.TextArea rows={4} placeholder="Permanent Address" />
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            label="Correspondence Address"
            name="correspondenceAddress"
            rules={[{ max: 250, message: "Max 250 characters allowed" }]}
          >
            <Input.TextArea rows={4} placeholder="Correspondence Address" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DoctorInfoStep;
