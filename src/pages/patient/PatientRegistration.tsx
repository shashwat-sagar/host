import React, { useState } from 'react';
import { Steps, Form, Button, message, theme } from 'antd';
import { FiUser, FiActivity, FiClipboard, FiUsers, FiCreditCard, FiCheck } from 'react-icons/fi';

import StepBasicDetails from './steps/StepBasicDetails';
import StepVitals from './steps/StepVitals';
import StepDiagnosis from './steps/StepDiagnosis';
import StepFamilyDetails from './steps/StepFamilyDetails';
import StepFinancialDetails from './steps/StepFinancialDetails';

const PatientRegistration = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const steps = [
        {
            title: 'Basic Info',
            icon: <FiUser />,
            content: <StepBasicDetails />,
        },
        {
            title: 'Vitals',
            icon: <FiActivity />,
            content: <StepVitals />,
        },
        {
            title: 'Diagnosis',
            icon: <FiClipboard />,
            content: <StepDiagnosis />,
        },
        {
            title: 'Family',
            icon: <FiUsers />,
            content: <StepFamilyDetails />,
        },
        {
            title: 'Financial',
            icon: <FiCreditCard />,
            content: <StepFinancialDetails />,
        },
    ];

    const stepsItems = steps.map((item, index) => ({
        key: item.title,
        title: item.title,
        icon: (
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${current === index ? 'border-indigo-500 text-indigo-500' : current > index ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-300'} transition-all`}>
                {current > index ? <FiCheck /> : item.icon}
            </div>
        )
    }));

    const next = () => {
        form.validateFields().then(() => {
            setCurrent(current + 1);
        }).catch((err) => {
            // Scroll to first error
            console.error("Validation failed:", err);
            message.error("Please fill in all required fields.");
        });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        message.success('Patient Registration Completed Successfully!');
        // Here you would typically submit the data to your backend
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8 text-center md:text-left">
                <h1 className="text-2xl font-bold text-slate-800">New Patient Registration</h1>
                <p className="text-slate-500">Capture complete patient demographic and medical details.</p>
            </div>

            {/* Stepper Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 overflow-x-auto">
                <Steps current={current} className="min-w-[700px]" items={stepsItems} />
            </div>

            {/* Form Content */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    paymentType: 'insurance',
                    gender: 'male'
                }}
            >
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
                    {steps[current].content}

                    {/* Actions */}
                    <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
                        {current > 0 && (
                            <Button
                                onClick={() => prev()}
                                className="!h-11 !px-8 !rounded-xl !text-slate-600 !border-slate-200 hover:!text-indigo-600 hover:!border-indigo-200"
                            >
                                Previous
                            </Button>
                        )}
                        {/* Spacer if no prev button */}
                        {current === 0 && <div></div>}

                        {current < steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={() => next()}
                                className="!h-11 !px-8 !rounded-xl !bg-indigo-600 hover:!bg-indigo-700 !shadow-lg shadow-indigo-200"
                            >
                                Next Step
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="!h-11 !px-8 !rounded-xl !bg-emerald-500 hover:!bg-emerald-600 !shadow-lg shadow-emerald-200 !border-none"
                            >
                                Complete Registration
                            </Button>
                        )}
                    </div>
                </div>
            </Form>

            {/* Step Indicators (Mobile friendly textual status) */}
            <div className="mt-4 text-center text-xs text-slate-400 font-medium md:hidden">
                Step {current + 1} of {steps.length}: {steps[current].title}
            </div>
        </div>
    );
};

export default PatientRegistration;
