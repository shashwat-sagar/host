import React from "react";
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Checkbox } from "antd";
const { TextArea } = Input;

const admissionTypes = [
  { label: "Emergency", value: "Emergency" },
  { label: "Elective", value: "Elective" },
  { label: "Day Care", value: "DayCare" },
  { label: "Maternity", value: "Maternity" },
  { label: "Transfer", value: "Transfer" },
];

const departments = [
  "General Medicine",
  "General Surgery",
  "Orthopedics",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Obstetrics & Gynaecology",
  "ENT",
  "Ophthalmology",
  "Dermatology",
  "Psychiatry",
].map((d) => ({ label: d, value: d }));

const wards = [
  "General Ward",
  "Semi-Private",
  "Private",
  "Deluxe",
  "ICU",
  "SICU",
  "PICU",
  "NICU",
].map((w) => ({ label: w, value: w }));

const bedCategories = [
  "General",
  "Semi-Private",
  "Private",
  "Deluxe",
  "ICU",
].map((b) => ({ label: b, value: b }));

const arrivalModes = [
  { label: "Walk-in", value: "WalkIn" },
  { label: "Ambulance", value: "Ambulance" },
  { label: "Referred", value: "Referred" },
];

const yesNo = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const AdmissionDetailsStep = () => {
  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={8}>
        <Form.Item label="Admission Type" name="admissionType" rules={[{ required: true, message: "Select admission type" }]}>
          <Select size="large" placeholder="Select admission type" options={admissionTypes} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Department" name="department" rules={[{ required: true, message: "Select department" }]}>
          <Select size="large" placeholder="Select department" options={departments} showSearch optionFilterProp="label" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Unit/Ward" name="ward" rules={[{ required: true, message: "Select ward/unit" }]}>
          <Select size="large" placeholder="Select ward/unit" options={wards} showSearch optionFilterProp="label" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Bed Category" name="bedCategory">
          <Select size="large" placeholder="Select bed category" options={bedCategories} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Requested Room Category" name="roomCategory">
          <Select size="large" placeholder="Select room category" options={bedCategories} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Admitting Consultant" name="consultant">
          <Select
            size="large"
            placeholder="Select/Type consultant"
            options={[
              { label: "Dr. Sharma", value: "Dr. Sharma" },
              { label: "Dr. Patel", value: "Dr. Patel" },
              { label: "Dr. Iyer", value: "Dr. Iyer" },
              { label: "Other", value: "Other" },
            ]}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Referring Doctor" name="referringDoctor">
          <Input size="large" placeholder="Name of referring doctor (if any)" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Admission Date" name="admissionDate" rules={[{ required: true, message: "Select admission date" }]}>
          <DatePicker size="large" style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Admission Time" name="admissionTime" rules={[{ required: true, message: "Select admission time" }]}>
          <TimePicker size="large" style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Mode of Arrival" name="arrivalMode">
          <Select size="large" placeholder="Select" options={arrivalModes} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="MLC Case" name="mlcCase">
          <Select size="large" placeholder="Select" options={yesNo} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Isolation Required" name="isolation">
          <Select size="large" placeholder="Select" options={yesNo} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Provisional Diagnosis" name="provisionalDiagnosis" rules={[{ required: true, message: "Enter diagnosis" }]}>
          <Input size="large" placeholder="e.g. Acute Appendicitis" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Reason for Admission / Clinical Notes" name="admissionReason">
          <TextArea rows={3} placeholder="Brief clinical notes, reason for admission" />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="consentTreatment" valuePropName="checked" rules={[{ validator: (_, v) => (v ? Promise.resolve() : Promise.reject(new Error("Consent is required"))) }]}>
          <Checkbox>I hereby give consent for medical/surgical treatment as advised by the hospital.</Checkbox>
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="consentData" valuePropName="checked" rules={[{ validator: (_, v) => (v ? Promise.resolve() : Promise.reject(new Error("Declaration is required"))) }]}>
          <Checkbox>I declare that the information provided is true and I consent to the use of my data for treatment and billing.</Checkbox>
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Patient/Guardian Name" name="declarationName">
          <Input size="large" placeholder="Name" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Relationship to Patient" name="declarationRelationship">
          <Select
            size="large"
            placeholder="Select"
            options={[
              { label: "Self", value: "Self" },
              { label: "Father", value: "Father" },
              { label: "Mother", value: "Mother" },
              { label: "Spouse", value: "Spouse" },
              { label: "Guardian", value: "Guardian" },
              { label: "Other", value: "Other" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Additional Notes" name="admissionNotes">
          <TextArea rows={2} placeholder="Any special instructions" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AdmissionDetailsStep;