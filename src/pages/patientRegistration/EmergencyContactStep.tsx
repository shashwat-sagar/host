import React from "react";
import { Row, Col, Form, Input, Select } from "antd";
const { TextArea } = Input;

const relationships = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Spouse", value: "Spouse" },
  { label: "Son", value: "Son" },
  { label: "Daughter", value: "Daughter" },
  { label: "Brother", value: "Brother" },
  { label: "Sister", value: "Sister" },
  { label: "Relative", value: "Relative" },
  { label: "Friend", value: "Friend" },
  { label: "Guardian", value: "Guardian" },
  { label: "Other", value: "Other" },
];

const languages = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Marathi", value: "Marathi" },
  { label: "Gujarati", value: "Gujarati" },
  { label: "Bengali", value: "Bengali" },
  { label: "Tamil", value: "Tamil" },
  { label: "Telugu", value: "Telugu" },
  { label: "Kannada", value: "Kannada" },
  { label: "Malayalam", value: "Malayalam" },
  { label: "Punjabi", value: "Punjabi" },
  { label: "Urdu", value: "Urdu" },
  { label: "Other", value: "Other" },
];

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
].map(s => ({ label: s, value: s }));

const EmergencyContactStep = () => {
  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={8}>
        <Form.Item
          label="Contact Name"
          name="emgContactName"
          rules={[{ required: true, message: "Contact name is required" }]}
        >
          <Input size="large" placeholder="Emergency contact full name" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item
          label="Relationship"
          name="emgRelationship"
          rules={[{ required: true, message: "Relationship is required" }]}
        >
          <Select size="large" placeholder="Select relationship" options={relationships} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item
          label="Primary Contact No."
          name="emgPrimaryPhone"
          rules={[{ required: true, message: "Primary contact number is required" }]}
        >
          <Input size="large" placeholder="e.g. 98xxxxxxxx" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Alternate Contact No." name="emgAltPhone">
          <Input size="large" placeholder="Alternate number (optional)" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Email" name="emgEmail" rules={[{ type: "email", message: "Enter a valid email" }]}>
          <Input size="large" placeholder="email@example.com" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Address Line 1" name="emgAddress1">
          <TextArea rows={2} placeholder="House/Flat, Street, Area" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Address Line 2" name="emgAddress2">
          <TextArea rows={1} placeholder="Landmark, locality (optional)" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="City" name="emgCity">
          <Input size="large" placeholder="City" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="State/UT" name="emgState">
          <Select size="large" placeholder="Select state" options={indianStates} showSearch optionFilterProp="label" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="PIN Code" name="emgPincode">
          <Input size="large" placeholder="e.g. 400001" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Preferred Language" name="emgLanguage">
          <Select size="large" placeholder="Select language" options={languages} showSearch optionFilterProp="label" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EmergencyContactStep;