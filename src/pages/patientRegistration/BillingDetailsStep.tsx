import React from "react";
import { Row, Col, Form, Input, Select, InputNumber } from "antd";
const { TextArea } = Input;

const paymentModes = [
  { label: "Cash", value: "Cash" },
  { label: "Card", value: "Card" },
  { label: "UPI", value: "UPI" },
  { label: "Net Banking", value: "NetBanking" },
  { label: "Cheque", value: "Cheque" },
];

const billingTypes = [
  { label: "Self-Pay", value: "Self" },
  { label: "Cashless (Insurance/TPA)", value: "Cashless" },
  { label: "Corporate", value: "Corporate" },
  { label: "Government Scheme", value: "Govt" },
];

const yesNo = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const BillingDetailsStep = () => {
  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={8}>
        <Form.Item label="Billing Type" name="billingType" rules={[{ required: true, message: "Select billing type" }]}>
          <Select size="large" placeholder="Select" options={billingTypes} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Payor / Insurer / Corporate" name="payor">
          <Input size="large" placeholder="e.g. XYZ Insurance / ABC Corp" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Policy / Employee ID" name="policyNo">
          <Input size="large" placeholder="Policy or Employee ID" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Policy Holder Name" name="policyHolder">
          <Input size="large" placeholder="Policy holder full name" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Sum Insured (₹)" name="sumInsured">
          <InputNumber size="large" min={0} style={{ width: "100%" }} placeholder="e.g. 500000" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Pre-auth Required" name="preauthRequired">
          <Select size="large" placeholder="Select" options={yesNo} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Pre-auth / Claim No." name="preauthNo">
          <Input size="large" placeholder="If available" />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Payment Mode (Self)" name="paymentMode">
          <Select size="large" placeholder="Select" options={paymentModes} />
        </Form.Item>
      </Col>

      <Col xs={24} md={8}>
        <Form.Item label="Advance / Deposit (₹)" name="deposit">
          <InputNumber size="large" min={0} style={{ width: "100%" }} placeholder="e.g. 5000" />
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item label="Billing Remarks / Notes" name="billingRemarks">
          <TextArea rows={2} placeholder="Any special instructions or remarks" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default BillingDetailsStep;