import React from 'react';
import { Form, Row, Col, Select, Checkbox, Badge } from 'antd';
import { FiUsers, FiInfo } from 'react-icons/fi';
import { GlassCard, GlowingInput, SelectionTile } from '../components/FormComponents';

const { Option } = Select;

const StepFamilyDetails = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center md:text-left mb-10">
                <Badge count="Step 4" className="mb-2 uppercase tracking-widest font-bold !bg-pink-100 !text-pink-600 shadow-none px-2 py-1 rounded-md" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Family & Guardian</h2>
                <p className="text-lg text-slate-500 max-w-lg">Hereditary history and emergency contacts.</p>
            </div>

            <GlassCard title="Hereditary Screening" icon={<FiUsers />} glowColor="pink" className="mb-8">
                <Form.Item name="familyHistory" noStyle>
                    <Checkbox.Group className="w-full">
                        <Row gutter={[16, 16]}>
                            {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Cancer', 'Thyroid', 'Mental Illness', 'Seizures'].map(item => (
                                <Col span={12} md={6} key={item}>
                                    <label className="cursor-pointer group block h-full">
                                        <Checkbox value={item} className="hidden peer" />
                                        <div className="h-full p-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold transition-all peer-checked:bg-pink-50 peer-checked:text-pink-600 peer-checked:border-pink-300 peer-checked:shadow-md hover:border-pink-200 text-center flex items-center justify-center">
                                            {item}
                                        </div>
                                    </label>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <div className="mt-8">
                    <GlowingInput label="Family Medical Notes" name="otherFamilyHistory" type="textarea" placeholder="Specific details regarding hereditary conditions..." />
                </div>
            </GlassCard>

            <GlassCard title="Guardian / Next of Kin" icon={<FiInfo />} glowColor="purple">
                <div className="absolute top-8 right-8 text-xs text-purple-600 font-bold flex items-center bg-purple-50 px-3 py-1 rounded-full border border-purple-100 uppercase tracking-wide">
                    Primary Contact
                </div>

                <Row gutter={24}>
                    <Col xs={24} md={12}>
                        <GlowingInput label="Full Name" name="guardianName" placeholder="Guardian Name" rules={[{ required: true }]} />
                    </Col>
                    <Col xs={24} md={6}>
                        <Form.Item label={<span className="font-semibold text-slate-600 ml-1">Relationship</span>} name="guardianRelationship" rules={[{ required: true }]}>
                            <Select placeholder="Select" className="!h-[50px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-white/50 [&_.ant-select-selector]:!border-slate-200 [&_.ant-select-selector]:!py-2">
                                <Option value="spouse">Spouse</Option>
                                <Option value="parent">Parent</Option>
                                <Option value="sibling">Sibling</Option>
                                <Option value="child">Child</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={6}>
                        <GlowingInput label="Mobile" name="guardianPhone" placeholder="(555) 000-0000" rules={[{ required: true }]} />
                    </Col>
                </Row>
            </GlassCard>
        </div>
    );
};

export default StepFamilyDetails;
