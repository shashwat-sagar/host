import React from "react";
import { Row, Col, Form, Input, Select, InputNumber } from "antd";
const { TextArea } = Input;

const MedicalDetailsStep = () => {
  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={8}>
        <Form.Item label="Blood Group" name="bloodGroup" rules={[{ required: true, message: "Select blood group" }]}>
          <Select
            size="large"
            placeholder="Select Blood Group"
            options={[
              { label: "A+", value: "A+" },
              { label: "A-", value: "A-" },
              { label: "B+", value: "B+" },
              { label: "B-", value: "B-" },
              { label: "O+", value: "O+" },
              { label: "O-", value: "O-" },
              { label: "AB+", value: "AB+" },
              { label: "AB-", value: "AB-" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Allergies" name="allergies">
          <Select
            size="large"
            mode="multiple"
            placeholder="Select Allergies"
            options={[
              { label: "Penicillin", value: "Penicillin" },
              { label: "Sulfa Drugs", value: "Sulfa" },
              { label: "NSAIDs", value: "NSAIDs" },
              { label: "Latex", value: "Latex" },
              { label: "Peanuts", value: "Peanuts" },
              { label: "Seafood", value: "Seafood" },
              { label: "Other", value: "Other" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Comorbidities" name="comorbidities">
          <Select
            size="large"
            mode="multiple"
            placeholder="Select Comorbidities"
            options={[
              { label: "Diabetes", value: "Diabetes" },
              { label: "Hypertension", value: "Hypertension" },
              { label: "Asthma", value: "Asthma" },
              { label: "COPD", value: "COPD" },
              { label: "CKD", value: "CKD" },
              { label: "IHD", value: "IHD" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Height (cm)" name="heightCm">
          <InputNumber min={0} max={300} size="large" placeholder="e.g. 170" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item label="Weight (kg)" name="weightKg">
          <InputNumber min={0} max={400} size="large" placeholder="e.g. 65" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item label="BMI" name="bmi">
          <InputNumber min={0} max={100} size="large" placeholder="Auto/Manual" style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="BP (mmHg)" name="bp">
          <Input size="large" placeholder="e.g. 120/80" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item label="Pulse (bpm)" name="pulse">
          <InputNumber min={0} max={250} size="large" placeholder="e.g. 78" style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item label="SpO₂ (%)" name="spo2">
          <InputNumber min={0} max={100} size="large" placeholder="e.g. 98" style={{ width: "100%" }} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Smoking" name="smoking">
          <Select
            size="large"
            placeholder="Select"
            options={[
              { label: "No", value: "No" },
              { label: "Yes", value: "Yes" },
              { label: "Former", value: "Former" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Alcohol" name="alcohol">
          <Select
            size="large"
            placeholder="Select"
            options={[
              { label: "No", value: "No" },
              { label: "Occasional", value: "Occasional" },
              { label: "Regular", value: "Regular" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Diet" name="diet">
          <Select
            size="large"
            placeholder="Select diet"
            options={[
              { label: "Vegetarian", value: "Vegetarian" },
              { label: "Non-Vegetarian", value: "Non-Vegetarian" },
              { label: "Vegan", value: "Vegan" },
            ]}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Primary Diagnosis" name="diagnosis" rules={[{ required: true, message: "Diagnosis is required" }]}>
          <Input size="large" placeholder="Diagnosis" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Presenting Complaints" name="presentingComplaints">
          <TextArea rows={2} placeholder="Describe chief complaints" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Past History / Notes" name="pastHistory">
          <TextArea rows={2} placeholder="Past medical/surgical history, notes" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default MedicalDetailsStep;