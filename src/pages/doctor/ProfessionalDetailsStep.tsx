import { Row, Col, Form, Input, Select, DatePicker, InputNumber, Divider } from "antd";

const ProfessionalDetailsStep = () => (
    <>
        <Divider orientation={"left" as any}>Medical Council Registration</Divider>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Medical Council Name"
                    name="medicalCouncilName"
                    rules={[{ required: true, message: "Medical council name is required" }]}
                >
                    {/* <Select
                        size="large"
                        placeholder="Select Medical Council"
                        options={[
                            { label: "Medical Council of India (MCI)", value: "MCI" },
                            { label: "State Medical Council", value: "State Medical Council" },
                        ]}
                    /> */}
                    <Input placeholder="Medical Council Name" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Registration Number"
                    name="registrationNumber"
                    rules={[{ required: true, message: "Registration number is required" }]}
                >
                    <Input placeholder="Registration Number" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Registration Date"
                    name="registrationDate"
                    rules={[{ required: true, message: "Registration date is required" }]}
                >
                    <DatePicker size="large" style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Year of Registration Renewal"
                    name="renewalYear"
                >
                    <InputNumber
                        min={1900}
                        max={2100}
                        placeholder="Year"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Col>
        </Row>

        <Divider orientation={"left" as any}>Qualifications</Divider>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Primary Qualification"
                    name="primaryQualification"
                    rules={[{ required: true, message: "Primary qualification is required" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Qualification"
                        options={[
                            { label: "MBBS", value: "MBBS" },
                            { label: "MBBS + MD", value: "MBBS + MD" },
                            { label: "MBBS + MS", value: "MBBS + MS" },
                            { label: "MBBS + Diploma", value: "MBBS + Diploma" },
                            { label: "BDS", value: "BDS" },
                            { label: "BAMS", value: "BAMS" },
                            { label: "BHMS", value: "BHMS" },
                            { label: "BUMS", value: "BUMS" },
                            { label: "BNYS", value: "BNYS" },
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Specialization"
                    name="specialization"
                   
                >
                    <Select
                        size="large"
                        placeholder="Select Specialization"
                        mode="multiple"
                        options={[
                            { label: "General Medicine", value: "General Medicine" },
                            { label: "General Surgery", value: "General Surgery" },
                            { label: "Pediatrics", value: "Pediatrics" },
                            { label: "Orthopedics", value: "Orthopedics" },
                            { label: "Gynecology & Obstetrics", value: "Gynecology & Obstetrics" },
                            { label: "Cardiology", value: "Cardiology" },
                            { label: "Neurology", value: "Neurology" },
                            { label: "Neurosurgery", value: "Neurosurgery" },
                            { label: "Dermatology", value: "Dermatology" },
                            { label: "Psychiatry", value: "Psychiatry" },
                            { label: "Ophthalmology", value: "Ophthalmology" },
                            { label: "ENT", value: "ENT" },
                            { label: "Pulmonology", value: "Pulmonology" },
                            { label: "Gastroenterology", value: "Gastroenterology" },
                            { label: "Nephrology", value: "Nephrology" },
                            { label: "Urology", value: "Urology" },
                            { label: "Oncology", value: "Oncology" },
                            { label: "Plastic Surgery", value: "Plastic Surgery" },
                            { label: "Anesthesiology", value: "Anesthesiology" },
                            { label: "Radiology", value: "Radiology" },
                            { label: "Pathology", value: "Pathology" },
                            { label: "Emergency Medicine", value: "Emergency Medicine" },
                            { label: "Family Medicine", value: "Family Medicine" },
                            { label: "Sports Medicine", value: "Sports Medicine" },
                            { label: "Pain Medicine", value: "Pain Medicine" },
                            { label: "Palliative Medicine", value: "Palliative Medicine" },
                        ]}
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} md={8}>
                <Form.Item
                    label="Additional Qualifications"
                    name="additionalQualifications"
                >
                    <Input.TextArea rows={2} placeholder="Additional Qualifications (DM, MCh, Fellowships, etc.)" />
                </Form.Item>
            </Col> */}
            <Col xs={24} md={8}>
                <Form.Item
                    label="Passing Year"
                    name="yearOfGraduation"
                    rules={[{ required: true, message: "Year of graduation is required" }]}
                >
                    <InputNumber
                        min={1900}
                        max={2100}
                        placeholder="Year of Graduation"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Medical College/University"
                    name="medicalCollege"
                    rules={[{ required: true, message: "Medical college is required" }]}
                >
                    <Input placeholder="Medical College/University" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Remarks"
                    name="remarks"
                  
                >
                    <Input placeholder="Remarks" size="large" />
                </Form.Item>
            </Col>
        </Row>

        <Divider orientation={"left" as any}>Professional Experience</Divider>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Total Years of Experience"
                    name="totalExperience"
                    rules={[{ required: true, message: "Total experience is required" }]}
                >
                    <InputNumber
                        min={0}
                        placeholder="Years"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Designation"
                    name="currentDesignation"
                >
                    <Input placeholder="Designation" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: "Department is required" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Department"
                        options={[
                            { label: "General Medicine", value: "General Medicine" },
                            { label: "General Surgery", value: "General Surgery" },
                            { label: "Pediatrics", value: "Pediatrics" },
                            { label: "Orthopedics", value: "Orthopedics" },
                            { label: "Gynecology & Obstetrics", value: "Gynecology & Obstetrics" },
                            { label: "Cardiology", value: "Cardiology" },
                            { label: "Neurology", value: "Neurology" },
                            { label: "Emergency", value: "Emergency" },
                            { label: "ICU", value: "ICU" },
                            { label: "Radiology", value: "Radiology" },
                            { label: "Pathology", value: "Pathology" },
                            { label: "Anesthesiology", value: "Anesthesiology" },
                            { label: "Ophthalmology", value: "Ophthalmology" },
                            { label: "ENT", value: "ENT" },
                            { label: "Dermatology", value: "Dermatology" },
                            { label: "Psychiatry", value: "Psychiatry" },
                            { label: "Other", value: "Other" },
                        ]}
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} md={12}>
                <Form.Item
                    label="Previous Hospital/Clinic Experience"
                    name="previousExperience"
                >
                    <Input.TextArea rows={3} placeholder="Previous Hospital/Clinic Experience" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Professional Memberships"
                    name="professionalMemberships"
                >
                    <Input.TextArea rows={3} placeholder="Professional Memberships (IMA, API, etc.)" />
                </Form.Item>
            </Col> */}
        </Row>

        {/* <Divider orientation={"left" as any}>Consultation Details</Divider>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Consultation Fee"
                    name="consultationFee"
                >
                    <InputNumber
                        min={0}
                        placeholder="Fee"
                        size="large"
                        style={{ width: "100%" }}
                        prefix="₹"
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="OPD Days"
                    name="opdDays"
                >
                    <Select
                        size="large"
                        placeholder="Select OPD Days"
                        mode="multiple"
                        options={[
                            { label: "Monday", value: "Monday" },
                            { label: "Tuesday", value: "Tuesday" },
                            { label: "Wednesday", value: "Wednesday" },
                            { label: "Thursday", value: "Thursday" },
                            { label: "Friday", value: "Friday" },
                            { label: "Saturday", value: "Saturday" },
                            { label: "Sunday", value: "Sunday" },
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Consultation Timing"
                    name="consultationTiming"
                >
                    <Input placeholder="e.g., 9:00 AM - 5:00 PM" size="large" />
                </Form.Item>
            </Col>
        </Row> */}
    </>
);

export default ProfessionalDetailsStep;
