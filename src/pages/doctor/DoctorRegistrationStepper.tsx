import { useState } from "react";
import { Steps, Button, Form, message, Card } from "antd";
import { Heading } from "../../components";

// Import child step components
import DoctorInfoStep from "./DoctorInfoStep";
import MedicalDetailsStep from "./MedicalDetailsStep";
import ProfessionalDetailsStep from "./ProfessionalDetailsStep";
import EmergencyContactStep from "./EmergencyContactStep";
import DeclarationStep from "./DeclarationStep";

const DoctorRegistrationStepper = () => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);

    const steps = [
        { title: "Doctor Info", content: DoctorInfoStep },
        { title: "Medical Details", content: MedicalDetailsStep },
        { title: "Professional Details", content: ProfessionalDetailsStep },
        { title: "Emergency Contact", content: EmergencyContactStep },
        { title: "Declaration", content: DeclarationStep }
    ];

    const next = async () => {
        try {
            await form.validateFields(); // validate step fields
            setCurrent(current + 1);
        } catch (error) {
            console.error("Validation failed:", error);
            message.error("Please fill all required fields in this step.");
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = (values: any) => {
        console.log("Final Form Values:", values);
        message.success("Doctor Registered Successfully!");
    };

    const CurrentStepContent = steps[current].content;

    return (
        <>
            <Heading title={"Doctor Registration"} />
            <div className="p-2 px-4 mvh-100">
                <div className="px-4">
                    <Card styles={{ body: { padding: 12 } }}>
                        <Steps
                            current={current}
                            onChange={(value) => setCurrent(value)}
                            items={steps.map((item) => ({ title: item.title }))}
                            className="mx-2"
                            responsive
                        />
                    </Card>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ marginTop: 20 }}
                >
                    <Card>
                        <CurrentStepContent />
                        <div style={{ marginTop: 24, textAlign: "center" }}>
                            {current > 0 && (
                                <Button style={{ marginRight: 8 }} onClick={prev}>
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={next}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            )}
                        </div>
                    </Card>
                </Form>
            </div>
        </>
    );
};

export default DoctorRegistrationStepper;
