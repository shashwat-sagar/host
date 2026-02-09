import { Row, Col, Form, Input, Select } from "antd";
import { FiPhone, FiUser, FiMail, FiInfo } from "react-icons/fi";
import { SectionHeader } from "./DoctorRegistrationStepper";



const EmergencyContactStep = () => (
    <div className="space-y-10">
        {/* 1. Primary Emergency Contact */}
        <section>
            <SectionHeader
                icon={FiUser}
                title="Primary Emergency Contact"
                subtitle="Main person to contact in case of an emergency"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Full Name"
                        name="emergencyContactPerson"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input prefix={<FiUser className="text-theme-text-secondary/50" />} placeholder="Contact Person Name" size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Relationship"
                        name="emergencyContactRelation"
                        rules={[{ required: true, message: "Required" }]}
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
                        label="Primary Phone Number"
                        name="emergencyContactNumber"
                        rules={[
                            { required: true, message: "Required" },
                            { pattern: /^[6-9]\d{9}$/, message: "Invalid mobile number" }
                        ]}
                    >
                        <Input prefix={<FiPhone className="text-theme-text-secondary/50" />} placeholder="10-digit mobile" size="large" maxLength={10} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Alternate Phone Number"
                        name="alternateEmergencyContact"
                        rules={[{ pattern: /^[6-9]\d{9}$/, message: "Invalid mobile number" }]}
                    >
                        <Input prefix={<FiPhone className="text-theme-text-secondary/50" />} placeholder="Secondary mobile" size="large" maxLength={10} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item
                        label="Email Address"
                        name="emergencyContactEmail"
                        rules={[{ type: "email", message: "Invalid email" }]}
                    >
                        <Input prefix={<FiMail className="text-theme-text-secondary/50" />} placeholder="contact@example.com" size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item
                        label="Residential Address"
                        name="emergencyContactAddress"
                    >
                        <Input.TextArea rows={3} placeholder="Full address of the contact person..." className="!rounded-2xl" />
                    </Form.Item>
                </Col>
            </Row>
        </section>

        {/* 2. Specific Instructions */}
        <section>
            <SectionHeader
                icon={FiInfo}
                title="Emergency Instructions"
                subtitle="Any specific preferences or clinical instructions"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24}>
                    <Form.Item
                        label="In Case of Emergency, Please Note"
                        name="emergencyInstructions"
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="e.g. Notify my spouse immediately, preferred hospital for transport, etc."
                            className="!rounded-2xl"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </section>
    </div>
);

export default EmergencyContactStep;
