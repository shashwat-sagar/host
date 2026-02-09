import { Row, Col, Form, Input, DatePicker, Select, InputNumber, Divider } from "antd";
import { FiUser, FiMail, FiPhone, FiCreditCard, FiMapPin } from "react-icons/fi";
import dayjs from "dayjs";
import { calculateAge } from "../patient/BasicInfoPatientRegistration";
import { SectionHeader } from "./DoctorRegistrationStepper";



const DoctorInfoStep = () => {
  const [form] = Form.useForm();

  return (
    <div className="space-y-10">
      {/* 1. Personal Identity */}
      <section>
        <SectionHeader
          icon={FiUser}
          title="Personal Identity"
          subtitle="Basic identification details as per official records"
        />
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Full Name"
              name="doctorName"
              tooltip="As registered in Medical Council"
              rules={[
                { required: true, message: "Doctor name is required" },
                { pattern: /^[A-Za-z ]+$/, message: "Only alphabets and spaces allowed" },
              ]}
            >
              <Input prefix={<FiUser className="text-theme-text-secondary/50" />} placeholder="e.g. Dr. John Doe" size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker
                size="large"
                className="w-full"
                placeholder="Select date"
                disabledDate={(current) => current && current > dayjs().endOf("day")}
                onChange={(value) => {
                  const age = calculateAge(value);
                  form.setFieldsValue({ age });
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Age"
              name="age"
            >
              <InputNumber
                disabled
                placeholder="Auto-calculated"
                size="large"
                className="w-full!"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                size="large"
                placeholder="Select"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Marital Status" name="maritalStatus">
              <Select
                size="large"
                placeholder="Select"
                options={[
                  { label: "Single", value: "Single" },
                  { label: "Married", value: "Married" },
                  { label: "Widow", value: "Widow" },
                  { label: "Divorced", value: "Divorced" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </section>

      {/* 2. Contact Information */}
      <section>
        <SectionHeader
          icon={FiPhone}
          title="Contact Information"
          subtitle="How we can reach you for important updates"
        />
        <Row gutter={[24, 0]}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input prefix={<FiMail className="text-theme-text-secondary/50" />} placeholder="doctor@example.com" size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Primary Contact No."
              name="contactNo"
              rules={[
                { required: true, message: "Required" },
                { pattern: /^[6-9]\d{9}$/, message: "Invalid mobile number" },
              ]}
            >
              <Input prefix={<FiPhone className="text-theme-text-secondary/50" />} placeholder="10-digit mobile" size="large" maxLength={10} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Alternate Contact No."
              name="alternateContact"
              rules={[{ pattern: /^[6-9]\d{9}$/, message: "Invalid mobile number" }]}
            >
              <Input prefix={<FiPhone className="text-theme-text-secondary/50" />} placeholder="Secondary mobile" size="large" maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
      </section>

      {/* 3. Statutory Details */}
      <section>
        <SectionHeader
          icon={FiCreditCard}
          title="Statutory Details"
          subtitle="Official IDs for verification"
        />
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Aadhaar Number"
              name="aadhaarNumber"
              rules={[
                { required: true, message: "Required" },
                { pattern: /^\d{12}$/, message: "Aadhaar must be 12 digits" },
              ]}
            >
              <Input prefix={<FiCreditCard className="text-theme-text-secondary/50" />} placeholder="xxxx xxxx xxxx" size="large" maxLength={12} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="PAN Number"
              name="panNumber"
              rules={[{ pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Invalid PAN format" }]}
            >
              <Input prefix={<FiCreditCard className="text-theme-text-secondary/50" />} placeholder="ABCDE1234F" size="large" maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
      </section>

      {/* 4. Residential Details */}
      <section>
        <SectionHeader
          icon={FiMapPin}
          title="Residential Details"
          subtitle="Your permanent and current living addresses"
        />
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Permanent Address"
              name="permanentAddress"
              rules={[{ max: 250, message: "Max 250 characters" }]}
            >
              <Input.TextArea rows={4} placeholder="Full permanent address..." className="!rounded-2xl" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Correspondence Address"
              name="correspondenceAddress"
              rules={[{ max: 250, message: "Max 250 characters" }]}
            >
              <Input.TextArea rows={4} placeholder="Full correspondence address..." className="!rounded-2xl" />
            </Form.Item>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default DoctorInfoStep;
