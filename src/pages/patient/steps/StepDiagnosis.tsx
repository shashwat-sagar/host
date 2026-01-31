import React from 'react';
import { Form, Row, Col, Select, Tag, Badge } from 'antd';
import { FiClipboard, FiAlertCircle, FiPlus, FiActivity } from 'react-icons/fi';
import { GlassCard, GlowingInput } from '../components/FormComponents';

const StepDiagnosis = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center md:text-left mb-10">
                <Badge count="Step 3" className="mb-2 uppercase tracking-widest font-bold !bg-blue-100 !text-blue-600 shadow-none px-2 py-1 rounded-md" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">History & Diagnosis</h2>
                <p className="text-lg text-slate-500 max-w-lg">Capture chief complaints and medical background.</p>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <GlassCard glowColor="blue" className="!border-blue-100/50">
                        <GlowingInput
                            label={<span className="text-xl font-bold text-slate-700 mb-2 block">Chief Complaint</span>}
                            name="chiefComplaint"
                            type="textarea"
                            rows={3}
                            placeholder="e.g. Severe migraine with aura since yesterday..."
                            rules={[{ required: true }]}
                        />
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1.5 mr-2">Quick Add:</span>
                            {['Fever', 'Cough', 'Headache', 'Abdominal Pain', 'Fatigue', 'Dizziness'].map(tag => (
                                <Tag key={tag} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all font-medium flex items-center shadow-sm">
                                    <FiPlus className="mr-1" /> {tag}
                                </Tag>
                            ))}
                        </div>
                    </GlassCard>
                </Col>

                <Col xs={24} md={12}>
                    <GlassCard title="Medical History" icon={<FiActivity />} glowColor="indigo" className="h-full">
                        <Form.Item name="pastHistory" noStyle>
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Add Conditions..."
                                className="custom-select-tags min-h-[120px]"
                                options={[
                                    { value: 'diabetes', label: 'Diabetes Type 2' },
                                    { value: 'htn', label: 'Hypertension' },
                                    { value: 'asthma', label: 'Bronchial Asthma' },
                                    { value: 'gerd', label: 'GERD' },
                                ]}
                            />
                        </Form.Item>
                        <style>{`
                            .custom-select-tags .ant-select-selector {
                                border-radius: 1rem !important;
                                padding: 12px !important;
                                background-color: rgba(255, 255, 255, 0.5) !important;
                                backdrop-filter: blur(8px);
                                border-color: #cbd5e1 !important;
                            }
                            .custom-select-tags .ant-select-selector:hover {
                                border-color: #6366f1 !important;
                            }
                            .custom-select-tags .ant-select-selection-item {
                                background: #e0e7ff !important;
                                color: #4338ca !important;
                                border-radius: 99px !important;
                                font-weight: 600;
                            }
                        `}</style>
                    </GlassCard>
                </Col>

                <Col xs={24} md={12}>
                    <div className="relative group h-full">
                        <div className="absolute inset-0 bg-red-500 rounded-3xl blur-xl opacity-5 group-hover:opacity-10 transition-opacity"></div>
                        <div className="relative h-full bg-red-50/30 p-8 rounded-3xl border border-red-100 backdrop-blur-xl transition-all hover:border-red-200 hover:shadow-lg hover:shadow-red-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm animate-pulse">
                                    <FiAlertCircle className="text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-red-800">Allergies & Risks</h3>
                            </div>

                            <div className="flex-grow">
                                <Form.Item name="allergies" noStyle>
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Add Allergies..."
                                        className="custom-select-red min-h-[120px]"
                                        options={[
                                            { value: 'penicillin', label: 'Penicillin' },
                                            { value: 'sulfa', label: 'Sulfa Drugs' },
                                            { value: 'peanuts', label: 'Peanuts' },
                                            { value: 'latex', label: 'Latex' },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <style>{`
                                .custom-select-red .ant-select-selector {
                                    border-radius: 1rem !important;
                                    padding: 12px !important;
                                    background-color: white !important;
                                    border-color: #fecaca !important;
                                }
                                .custom-select-red .ant-select-selection-item {
                                    background: #fee2e2 !important;
                                    color: #991b1b !important;
                                    border-color: #fecaca !important;
                                    border-radius: 99px !important;
                                    font-weight: 600;
                                }
                                .custom-select-red .ant-select-selection-placeholder {
                                    color: #f87171 !important;
                                }
                            `}</style>
                            <p className="text-red-500 text-xs mt-3 font-bold uppercase tracking-wide flex items-center">
                                <FiAlertCircle className="mr-1" /> Critical Safety Check Active
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default StepDiagnosis;
