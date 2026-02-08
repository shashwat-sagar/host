import { Row, Col, Form, Input, Select, InputNumber } from "antd";

const MedicalDetailsStep = () => (
    <>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Blood Group"
                    name="bloodGroup"
                    rules={[{ required: true, message: "Blood group is required" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Blood Group"
                        options={[
                            { label: "A+", value: "A+" },
                            { label: "A-", value: "A-" },
                            { label: "B+", value: "B+" },
                            { label: "B-", value: "B-" },
                            { label: "AB+", value: "AB+" },
                            { label: "AB-", value: "AB-" },
                            { label: "O+", value: "O+" },
                            { label: "O-", value: "O-" },
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Height (in cm)"
                    name="height"
                >
                    <InputNumber
                        min={0}
                        placeholder="Height in cm"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Weight (in kg)"
                    name="weight"
                >
                    <InputNumber
                        min={0}
                        placeholder="Weight in kg"
                        size="large"
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Known Allergies"
                    name="knownAllergies"
                >
                    <Input.TextArea rows={2} placeholder="Known Allergies" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Medical Conditions"
                    name="medicalConditions"
                >
                    <Input.TextArea rows={2} placeholder="Medical Conditions" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Current Medications"
                    name="currentMedications"
                >
                    <Input.TextArea rows={2} placeholder="Current Medications" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Person"
                    name="emergencyContactPerson"
                    rules={[{ required: true, message: "Emergency contact person is required" }]}
                >
                    <Input placeholder="Emergency Contact Person" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Number"
                    name="emergencyContactNumber"
                    rules={[{ required: true, message: "Emergency contact number is required" }]}
                >
                    <Input placeholder="Emergency Contact Number" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Relation with Emergency Contact"
                    name="emergencyContactRelation"
                >
                    <Select
                        size="large"
                        placeholder="Select Relation"
                        options={[
                            { label: "Spouse", value: "Spouse" },
                            { label: "Parent", value: "Parent" },
                            { label: "Sibling", value: "Sibling" },
                            { label: "Child", value: "Child" },
                            { label: "Friend", value: "Friend" },
                            { label: "Other", value: "Other" },
                        ]}
                    />
                </Form.Item>
            </Col>
        </Row>
    </>
);

export default MedicalDetailsStep;
