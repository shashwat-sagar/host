import React from 'react';
import { Form, Row, Col, Slider, InputNumber, Badge } from 'antd';
import { FiActivity, FiHeart, FiThermometer, FiWind } from 'react-icons/fi';
import { FaLungs } from 'react-icons/fa';
import { GlassCard, GlowingInput } from '../components/FormComponents';

const StepVitals = () => {
    return (
        <div className="animate-fade-in-up">
            <div className="text-center md:text-left mb-10">
                <Badge count="Step 2" className="mb-2 uppercase tracking-widest font-bold !bg-emerald-100 !text-emerald-600 shadow-none px-2 py-1 rounded-md" />
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Vitals & Measurements</h2>
                <p className="text-lg text-slate-500 max-w-lg">Record current vital signs and physical anthropometry.</p>
            </div>

            <Row gutter={[24, 24]}>
                {/* Heart & Circulation Widget */}
                <Col xs={24} lg={14}>
                    <GlassCard title="Cardiovascular & Respiratory" icon={<FiHeart />} glowColor="rose" className="h-full">
                        <Row gutter={[20, 20]} align="middle">
                            <Col span={12}>
                                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">Blood Pressure</label>
                                    <div className="flex items-center gap-2">
                                        <Form.Item name="bpSystolic" noStyle>
                                            <InputNumber placeholder="120" className="!w-20 !rounded-lg !border-transparent !bg-white !text-xl !font-bold !text-slate-700 shadow-sm" controls={false} />
                                        </Form.Item>
                                        <span className="text-rose-300 text-2xl font-light">/</span>
                                        <Form.Item name="bpDiastolic" noStyle>
                                            <InputNumber placeholder="80" className="!w-20 !rounded-lg !border-transparent !bg-white !text-xl !font-bold !text-slate-700 shadow-sm" controls={false} />
                                        </Form.Item>
                                    </div>
                                    <div className="text-xs text-rose-400 mt-2 text-right">mmHg</div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">Pulse Rate</label>
                                    <div className="flex items-end gap-2">
                                        <Form.Item name="pulse" noStyle>
                                            <InputNumber placeholder="72" className="!w-full !rounded-lg !border-transparent !bg-white !text-3xl !font-bold !text-slate-700 shadow-sm" controls={false} />
                                        </Form.Item>
                                        <span className="text-rose-400 text-sm font-medium mb-2">bpm</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2 flex items-center gap-1"><FaLungs /> SpO2</label>
                                    <div className="flex items-end gap-2">
                                        <Form.Item name="spo2" noStyle>
                                            <InputNumber placeholder="98" className="!w-full !rounded-lg !border-transparent !bg-white !text-3xl !font-bold !text-slate-700 shadow-sm" controls={false} />
                                        </Form.Item>
                                        <span className="text-blue-400 text-sm font-medium mb-2">%</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                                    <label className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-2 flex items-center gap-1"><FiThermometer /> Temp</label>
                                    <div className="flex items-end gap-2">
                                        <Form.Item name="temperature" noStyle>
                                            <InputNumber placeholder="98.6" className="!w-full !rounded-lg !border-transparent !bg-white !text-3xl !font-bold !text-slate-700 shadow-sm" controls={false} />
                                        </Form.Item>
                                        <span className="text-orange-400 text-sm font-medium mb-2">°F</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </GlassCard>
                </Col>

                {/* Physical Body Widget */}
                <Col xs={24} lg={10}>
                    <GlassCard title="Anthropometry" icon={<FiActivity />} glowColor="indigo" className="h-full" delay={1}>
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-slate-600">Height (cm)</label>
                                <span className="text-indigo-600 font-bold bg-indigo-50 px-2 rounded-md">
                                    <Form.Item name="height" noStyle shouldUpdate>
                                        {({ getFieldValue }) => getFieldValue('height') || 0}
                                    </Form.Item> cm
                                </span>
                            </div>
                            <Form.Item name="height" noStyle>
                                <Slider min={50} max={250} tooltip={{ open: false }} trackStyle={{ background: '#6366f1', height: 8 }} handleStyle={{ borderColor: '#6366f1', boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)', height: 20, width: 20, marginTop: -6 }} railStyle={{ height: 8, background: '#e0e7ff' }} />
                            </Form.Item>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-slate-600">Weight (kg)</label>
                                <span className="text-pink-600 font-bold bg-pink-50 px-2 rounded-md">
                                    <Form.Item name="weight" noStyle shouldUpdate>
                                        {({ getFieldValue }) => getFieldValue('weight') || 0}
                                    </Form.Item> kg
                                </span>
                            </div>
                            <Form.Item name="weight" noStyle>
                                <Slider min={2} max={200} step={0.1} tooltip={{ open: false }} trackStyle={{ background: '#ec4899', height: 8 }} handleStyle={{ borderColor: '#ec4899', boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.2)', height: 20, width: 20, marginTop: -6 }} railStyle={{ height: 8, background: '#fce7f3' }} />
                            </Form.Item>
                        </div>

                        <div className="bg-indigo-600 rounded-2xl p-6 text-center text-white relative overflow-hidden shadow-lg shadow-indigo-200">
                            <div className="absolute top-0 right-0 p-2 opacity-10"><FiActivity size={80} /></div>
                            <p className="text-indigo-200 text-xs uppercase tracking-widest font-bold mb-1">Calculated BMI</p>
                            <span className="text-5xl font-black tracking-tight">22.4</span>
                            <div className="mt-3 inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/20">
                                Normal Weight
                            </div>
                        </div>
                    </GlassCard>
                </Col>

                <Col xs={24}>
                    <GlowingInput label="Clinical Notes" name="vitalsNotes" type="textarea" rows={2} placeholder="Patient observations..." />
                </Col>
            </Row>
        </div>
    );
};

export default StepVitals;
