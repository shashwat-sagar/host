import React from 'react';
import { Form, Row, Col, Select, Radio, Badge, Input } from 'antd';
import { FiCreditCard, FiShield, FiUser, FiBriefcase } from 'react-icons/fi';
import { GlassCard, GlowingInput, SelectionTile } from '../components/FormComponents';

const { Option } = Select;

const StepFinancialDetails = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center md:text-left mb-10">
                <Badge count="Step 5" className="mb-2 uppercase tracking-widest font-bold !bg-amber-100 !text-amber-600 shadow-none px-2 py-1 rounded-md" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Billing & Insurance</h2>
                <p className="text-lg text-slate-500 max-w-lg">Setup payment method and insurance coverage.</p>
            </div>

            <GlassCard title="Primary Payer" icon={<FiCreditCard />} glowColor="amber" className="mb-8">
                <Form.Item name="paymentType" rules={[{ required: true }]}>
                    <Radio.Group className="w-full">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={8}>
                                <Radio.Button value="insurance" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                    <SelectionTile
                                        value="insurance"
                                        label="Insurance"
                                        subLabel="Private or Government"
                                        icon={<FiShield />}
                                        color="blue"
                                    />
                                </Radio.Button>
                            </Col>
                            <Col xs={24} md={8}>
                                <Radio.Button value="self" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                    <SelectionTile
                                        value="self"
                                        label="Self Pay"
                                        subLabel="Cash or Credit Card"
                                        icon={<FiUser />}
                                        color="emerald"
                                    />
                                </Radio.Button>
                            </Col>
                            <Col xs={24} md={8}>
                                <Radio.Button value="corporate" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                    <SelectionTile
                                        value="corporate"
                                        label="Corporate"
                                        subLabel="Company Sponsored"
                                        icon={<FiBriefcase />}
                                        color="purple"
                                    />
                                </Radio.Button>
                            </Col>
                        </Row>
                    </Radio.Group>
                </Form.Item>
            </GlassCard>

            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.paymentType !== currentValues.paymentType}>
                {({ getFieldValue }) =>
                    getFieldValue('paymentType') === 'insurance' ? (
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-200 mt-6 text-white animate-fade-in relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <h4 className="font-bold text-2xl flex items-center">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-3 backdrop-blur-md border border-white/20">
                                            <FiShield className="text-xl" />
                                        </div>
                                        Policy Details
                                    </h4>
                                    <div className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-md">
                                        Active Coverage
                                    </div>
                                </div>
                                <Row gutter={24}>
                                    <Col xs={24} md={12}>
                                        <Form.Item label={<span className="text-blue-100 font-semibold mb-1 block">Provider</span>} name="insuranceProvider" rules={[{ required: true }]}>
                                            <Select placeholder="Select Provider" className="!h-[50px] [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!bg-white/10 [&_.ant-select-selector]:!border-white/20 [&_.ant-select-selector]:!text-white [&_.ant-select-selection-placeholder]:!text-blue-200 [&_.ant-select-arrow]:!text-white [&_.ant-select-selector]:!py-2">
                                                <Option value="bluecross">Blue Cross Blue Shield</Option>
                                                <Option value="aetna">Aetna</Option>
                                                <Option value="cigna">Cigna</Option>
                                                <Option value="uhc">UnitedHealthcare</Option>
                                                <Option value="medicare">Medicare</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item label={<span className="text-blue-100 font-semibold mb-1 block">Policy Number</span>} name="policyNumber" rules={[{ required: true }]}>
                                            <Input className="!h-[50px] !rounded-xl !bg-white/10 !border-white/20 !text-white placeholder:!text-blue-200 !text-lg !font-mono" placeholder="POL-XXX-XXX" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item label={<span className="text-blue-100 font-semibold mb-1 block">Group ID</span>} name="groupNumber">
                                            <Input className="!h-[50px] !rounded-xl !bg-white/10 !border-white/20 !text-white placeholder:!text-blue-200" placeholder="GRP-000" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item label={<span className="text-blue-100 font-semibold mb-1 block">Deductible ($)</span>} name="deductible">
                                            <Input prefix={<span className="text-blue-200 mr-1">$</span>} className="!h-[50px] !rounded-xl !bg-white/10 !border-white/20 !text-white placeholder:!text-blue-200" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ) : null
                }
            </Form.Item>
        </div>
    );
};

export default StepFinancialDetails;
