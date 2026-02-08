import { Row, Col, Form, Input, Select } from "antd";

const EmergencyContactStep = () => (
    <>
        <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Person Name"
                    name="emergencyContactPerson"
                    rules={[{ required: true, message: "Emergency contact person name is required" }]}
                >
                    <Input placeholder="Emergency Contact Person Name" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Relationship"
                    name="emergencyContactRelation"
                    rules={[{ required: true, message: "Relationship is required" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Relationship"
                        options={[
                            { label: "Spouse", value: "Spouse" },
                            { label: "Parent", value: "Parent" },
                            { label: "Sibling", value: "Sibling" },
                            { label: "Child", value: "Child" },
                            { label: "Friend", value: "Friend" },
                            { label: "Colleague", value: "Colleague" },
                            { label: "Other", value: "Other" },
                        ]}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Number"
                    name="emergencyContactNumber"
                    rules={[
                        { required: true, message: "Emergency contact number is required" },
                    ]}
                >
                    <Input placeholder="Emergency Contact Number" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Alternate Emergency Contact Number"
                    name="alternateEmergencyContact"
                >
                    <Input placeholder="Alternate Emergency Contact Number" size="large" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Email"
                    name="emergencyContactEmail"
                >
                    <Input placeholder="Emergency Contact Email" size="large" type="email" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Emergency Contact Address"
                    name="emergencyContactAddress"
                >
                    <Input.TextArea rows={3} placeholder="Emergency Contact Address" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={[24, 16]}>
            <Col xs={24}>
                <Form.Item
                    label="In Case of Emergency, Please Contact"
                    name="emergencyInstructions"
                >
                    <Input.TextArea
                        rows={3}
                        placeholder="Any specific instructions or preferences in case of emergency"
                    />
                </Form.Item>
            </Col>
        </Row>
    </>
);

export default EmergencyContactStep;
