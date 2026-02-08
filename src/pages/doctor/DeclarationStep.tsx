import { Row, Col, Form, Input, Checkbox, Divider } from "antd";

const DeclarationStep = () => (
    <>
        <Divider orientation={"left" as any}>Declaration & Agreement</Divider>

        <Row gutter={[24, 16]}>
            <Col xs={24}>
                <Form.Item
                    name="declaration"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept the declaration')),
                        },
                    ]}
                >
                    <Checkbox>
                        I hereby declare that all the information provided by me in this registration form is true, complete, and correct to the best of my knowledge and belief. I understand that any false statement or misrepresentation may lead to rejection of my registration or termination of my services.
                    </Checkbox>
                </Form.Item>
            </Col>

            <Col xs={24}>
                <Form.Item
                    name="medicalCouncilDeclaration"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept the medical council declaration')),
                        },
                    ]}
                >
                    <Checkbox>
                        I hereby declare that I am a registered medical practitioner with a valid registration from the Medical Council of India/State Medical Council and my registration is in good standing.
                    </Checkbox>
                </Form.Item>
            </Col>

            <Col xs={24}>
                <Form.Item
                    name="criminalDeclaration"
                    valuePropName="checked"
                >
                    <Checkbox>
                        I hereby declare that I have no criminal records or pending criminal cases against me. In case of any such case, I will immediately inform the hospital administration.
                    </Checkbox>
                </Form.Item>
            </Col>

            <Col xs={24}>
                <Form.Item
                    name="ethicsDeclaration"
                    valuePropName="checked"
                >
                    <Checkbox>
                        I agree to abide by the medical ethics and code of conduct of the hospital and the Medical Council of India. I will maintain the highest standards of professional conduct and patient care.
                    </Checkbox>
                </Form.Item>
            </Col>

            <Col xs={24}>
                <Form.Item
                    name="confidentialityDeclaration"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Please accept the confidentiality declaration')),
                        },
                    ]}
                >
                    <Checkbox>
                        I understand that all patient information is confidential and I will not disclose any patient information to any unauthorized person. I will maintain the confidentiality of all patient records.
                    </Checkbox>
                </Form.Item>
            </Col>

            <Col xs={24}>
                <Form.Item
                    name="termsDeclaration"
                    valuePropName="checked"
                >
                    <Checkbox>
                        I agree to the terms and conditions of service, including working hours, duties, and responsibilities as specified by the hospital administration.
                    </Checkbox>
                </Form.Item>
            </Col>
        </Row>

        <Divider orientation={"left" as any}>Additional Notes</Divider>

        <Row gutter={[24, 16]}>
            <Col xs={24}>
                <Form.Item
                    label="Additional Comments or Notes"
                    name="additionalComments"
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Any additional comments or notes you would like to add"
                    />
                </Form.Item>
            </Col>
        </Row>

        <Divider orientation={"left" as any}>Document Upload</Divider>

        <Row gutter={[24, 16]}>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Passport Size Photo"
                    name="passportPhoto"
                >
                    <Input type="file" accept="image/*" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Medical Council Registration Certificate"
                    name="registrationCertificate"
                >
                    <Input type="file" accept="image/*,.pdf" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Qualification Certificates"
                    name="qualificationCertificates"
                >
                    <Input type="file" accept="image/*,.pdf" multiple />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="ID Proof (Aadhaar/PAN)"
                    name="idProof"
                >
                    <Input type="file" accept="image/*,.pdf" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Address Proof"
                    name="addressProof"
                >
                    <Input type="file" accept="image/*,.pdf" />
                </Form.Item>
            </Col>
            <Col xs={24} md={8}>
                <Form.Item
                    label="Experience Letters"
                    name="experienceLetters"
                >
                    <Input type="file" accept="image/*,.pdf" multiple />
                </Form.Item>
            </Col>
        </Row>

        <Divider orientation={"left" as any}>Signature</Divider>

        <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Doctor's Signature"
                    name="doctorSignature"
                >
                    <Input type="file" accept="image/*" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    label="Date"
                    name="signatureDate"
                >
                    <Input type="date" size="large" style={{ width: "100%" }} />
                </Form.Item>
            </Col>
        </Row>
    </>
);

export default DeclarationStep;
