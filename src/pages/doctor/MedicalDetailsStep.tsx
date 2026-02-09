import { Row, Col, Form, Input, Select, InputNumber } from "antd";
import { FiActivity, FiUser, FiPhone, FiAlertCircle, FiDroplet, FiMaximize, FiTarget } from "react-icons/fi";
import { SectionHeader } from "./DoctorRegistrationStepper";


const MedicalDetailsStep = () => (
    <div className="space-y-10">
        {/* 1. Vital Statistics */}
        <section>
            <SectionHeader
                icon={FiActivity}
                title="Vital Statistics"
                subtitle="Physical measurements and basic health markers"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Blood Group"
                        name="bloodGroup"
                        rules={[{ required: true, message: "Blood group is required" }]}
                    >
                        <Select
                            size="large"
                            placeholder="Select Blood Group"
                            prefix={<FiDroplet className="text-theme-text-secondary/50 mr-2" />}
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
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Height (in cm)"
                        name="height"
                    >
                        <InputNumber
                            min={0}
                            placeholder="Height in cm"
                            size="large"
                            className="w-full!"
                            prefix={<FiMaximize className="text-theme-text-secondary/50" />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Weight (in kg)"
                        name="weight"
                    >
                        <InputNumber
                            min={0}
                            placeholder="Weight in kg"
                            size="large"
                            className="w-full!"
                            prefix={<FiTarget className="text-theme-text-secondary/50" />}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </section>

        {/* 2. Medical History */}
        <section>
            <SectionHeader
                icon={FiAlertCircle}
                title="Medical Conditions & Allergies"
                subtitle="Important clinical information for safety"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Known Allergies"
                        name="knownAllergies"
                    >
                        <Input.TextArea rows={4} placeholder="e.g. Penicillin, Peanuts..." className="!rounded-2xl" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Medical Conditions"
                        name="medicalConditions"
                    >
                        <Input.TextArea rows={4} placeholder="e.g. Hypertension, Diabetes..." className="!rounded-2xl" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Current Medications"
                        name="currentMedications"
                    >
                        <Input.TextArea rows={4} placeholder="List medications you are currently taking..." className="!rounded-2xl" />
                    </Form.Item>
                </Col>
            </Row>
        </section>

        {/* 3. Emergency Contact */}
        <section>
            <SectionHeader
                icon={FiPhone}
                title="Emergency Contact"
                subtitle="Who should we contact in case of an emergency?"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="emergencyContactPerson"
                        rules={[{ required: true, message: "Emergency contact person is required" }]}
                    >
                        <Input prefix={<FiUser className="text-theme-text-secondary/50" />} placeholder="Contact Name" size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Primary Phone"
                        name="emergencyContactNumber"
                        rules={[
                            { required: true, message: "Emergency contact number is required" },
                            { pattern: /^[6-9]\d{9}$/, message: "Invalid mobile number" }
                        ]}
                    >
                        <Input prefix={<FiPhone className="text-theme-text-secondary/50" />} placeholder="10-digit mobile" size="large" maxLength={10} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Relationship"
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
        </section>
    </div>
);

export default MedicalDetailsStep;
