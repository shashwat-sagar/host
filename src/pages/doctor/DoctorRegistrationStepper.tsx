import { useState } from "react";
import { Steps, Button, Form, message, Card } from "antd";
import { ScreenWrapper } from "../../components";
import {
  FiCheckCircle,
  FiUser,
  FiActivity,
  FiBriefcase,
  FiPhone,
  FiFileText,
  FiArrowRight,
  FiArrowLeft,
  FiSave,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
    { title: "Doctor Info", icon: <FiUser />, content: DoctorInfoStep },
    {
      title: "Medical Details",
      icon: <FiActivity />,
      content: MedicalDetailsStep,
    },
    {
      title: "Professional Details",
      icon: <FiBriefcase />,
      content: ProfessionalDetailsStep,
    },
    {
      title: "Emergency Contact",
      icon: <FiPhone />,
      content: EmergencyContactStep,
    },
    { title: "Declaration", icon: <FiFileText />, content: DeclarationStep },
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
    <ScreenWrapper title="Doctor Registration">
      <div className="flex flex-col justify-between gap-6">
        {/* Stepper Sidebar */}
        <div className="col-span-1">
          <Card
            className=" border-none shadow-sm rounded-2xl overflow-hidden glass-card"
            styles={{ body: { padding: "24px 16px" } }}
          >
            <Steps
              orientation="horizontal"
              current={current}
              onChange={(value) => setCurrent(value)}
              className="custom-stepper"
              items={steps.map((item, index) => ({
                title: (
                  <span
                    className={`font-medium transition-colors ${current === index ? "text-primary" : "text-theme-text-secondary"}`}
                  >
                    {item.title}
                  </span>
                ),
                icon: (
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      current === index
                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                        : current > index
                          ? "bg-green-500 text-white"
                          : "bg-theme-bg-secondary text-theme-text-secondary"
                    }`}
                  >
                    {current > index ? <FiCheckCircle size={20} /> : item.icon}
                  </div>
                ),
              }))}
            />
          </Card>
        </div>

        {/* Form Content */}
        <div className="col-span-1">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden glass-card"
                  styles={{ body: { padding: "32px" } }}
                >

                  <div className="min-h-100">
                    <CurrentStepContent />
                  </div>

                  <div className="mt-12 pt-8 border-t border-theme-border flex items-center justify-between">
                    <Button
                      disabled={current === 0}
                      onClick={prev}
                      icon={<FiArrowLeft />}
                      className="flex items-center gap-2 h-11 px-6 rounded-xl border-theme-border hover:border-primary hover:text-primary transition-all"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-4">
                      {current < steps.length - 1 ? (
                        <Button
                          type="primary"
                          onClick={next}
                          className="flex items-center gap-2 h-11 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                          <span>Next Step</span>
                          <FiArrowRight />
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<FiSave />}
                          className="flex items-center gap-2 h-11 px-8 rounded-xl bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700 shadow-lg shadow-green-200 transition-all font-semibold"
                        >
                          Complete Registration
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Form>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default DoctorRegistrationStepper;


export const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) => (
  <div className="flex items-center gap-3 border-b border-primary-200 mb-6 mt-4 pb-4">

    <div className="p-2 rounded-lg border bg-primary/10 text-primary">
      <Icon size={18} />
    </div>
    <div>
      <h3 className="text-base font-bold text-theme-text m-0">{title}</h3>
      {subtitle && <p className="text-xs text-theme-text-secondary m-0">{subtitle}</p>}
    </div>
  </div>
);