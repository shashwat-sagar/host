import React, { useState } from "react";
import { Steps, Button, Form, message, Card } from "antd";
import { Heading } from "../../components/Heading";

// Import child step components
import PatientInfoStep from "./PatientInfoStep";
import MedicalDetailsStep from "./MedicalDetailsStep";
import BillingDetailsStep from "./BillingDetailsStep";
import EmergencyContactStep from "./EmergencyContactStep";
import AdmissionDetailsStep from "./AdmissionDetailsStep";
import DeclarationStep from "./DeclarationStep";



const PatientRegistrationStepper = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
const steps = [
  { title: "Patient Info", content: PatientInfoStep },
  { title: "Medical Details", content: MedicalDetailsStep },
  { title: "Billing", content: BillingDetailsStep },
  { title: "Emergency Contact", content: EmergencyContactStep },
  { title: "Admission & Declaration", content: AdmissionDetailsStep }
];
  const next = async () => {
    try {
      await form.validateFields(); // validate step fields
      setCurrent(current + 1);
    } catch (error) {
      message.error("Please fill all required fields in this step.");
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("Final Form Values:", values);
    message.success("Patient Registered Successfully!");
  };

  const CurrentStepContent = steps[current].content;

  return (
    <>
      <Heading title={"Patient Registration"} />
      <div className="p-2 px-4 mvh-100">
       <div className="px-4">
         <Card bodyStyle={{ padding: 12 }}>
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
            <CurrentStepContent form={form} />
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

export default PatientRegistrationStepper;
