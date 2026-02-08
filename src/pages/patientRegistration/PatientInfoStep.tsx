import React from "react";
import { Row, Col, Form, Input, DatePicker, Select, TimePicker, InputNumber } from "antd";
const { TextArea } = Input;

const PatientInfoStep = () => (
  <Row gutter={[24, 16]}>
    <Col xs={24} md={8}>
      <Form.Item label="Registration No." name="registrationNo" rules={[{ required: true, message: 'Registration No. is required' }]}>
        <Input placeholder="Registration No." size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Date is required' }]}>
        <DatePicker size="large" style={{ width: "100%" }} />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Time is required' }]}>
        <TimePicker size="large" style={{ width: "100%" }} format="HH:mm" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Patient Name (as per ID)" name="patientName" rules={[{ required: true, message: 'Patient name is required' }]}>
        <Input placeholder="Patient Name" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Age is required' }]}>
        <InputNumber min={0} max={120} placeholder="Age" size="large" style={{ width: "100%" }} />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Date of Birth" name="dob">
        <DatePicker size="large" style={{ width: "100%" }} />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Gender is required' }]}>
        <Select size="large" placeholder="Select gender" options={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Other", value: "Other" }]} />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Father’s / Husband’s / Guardian’s Name" name="guardianName">
        <Input placeholder="Guardian Name" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Contact No." name="contactNo" rules={[{ required: true, message: 'Contact number is required' }]}>
        <Input placeholder="Contact No." size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Alternate No." name="alternateNo">
        <Input placeholder="Alternate No." size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Email ID" name="email" rules={[{ type: 'email', message: 'Enter a valid email' }]}>
        <Input placeholder="Email" size="large" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="ID Proof" name="idProof">
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
    <Col xs={24} md={8}>
      <Form.Item label="ID Number" name="idNumber">
        <Input placeholder="ID Number" size="large" />
      </Form.Item>
    </Col>
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
    <Col xs={24} md={8}>
      <Form.Item label="Religion" name="religion">
        <Select
          size="large"
          placeholder="Select Religion"
          options={[
            { label: "Hindu", value: "Hindu" },
            { label: "Muslim", value: "Muslim" },
            { label: "Christian", value: "Christian" },
            { label: "Sikh", value: "Sikh" },
            { label: "Buddhist", value: "Buddhist" },
            { label: "Jain", value: "Jain" },
            { label: "Other", value: "Other" },
          ]}
        />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Nationality" name="nationality">
        <Select
          size="large"
          placeholder="Select Nationality"
          options={[
            { label: "Indian", value: "Indian" },
            { label: "Other", value: "Other" },
          ]}
        />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Permanent Address" name="permanentAddress">
        <TextArea rows={4} placeholder="Permanent Address" />
      </Form.Item>
    </Col>
    <Col xs={24} md={8}>
      <Form.Item label="Present Address" name="presentAddress">
        <TextArea rows={4} placeholder="Present Address" />
      </Form.Item>
    </Col>
  </Row>
);

export default PatientInfoStep;
