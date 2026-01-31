import React, { useState } from 'react';
import { Form, Row, Col, Radio, Upload, Badge } from 'antd';
import { FiUser, FiMapPin, FiPhone, FiMail, FiCamera, FiPlus } from 'react-icons/fi';
import { BsGenderMale, BsGenderFemale, BsGenderTrans } from 'react-icons/bs';
import { GlassCard, GlowingInput, SelectionTile } from '../components/FormComponents';

const StepBasicDetails = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUpload = (info: any) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target?.result as string);
        };
        // Mocking file read
        if (info.file.originFileObj) {
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    return (
        <div className="animate-fade-in-up">
            {/* Header Section with Avatar */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="relative group shrink-0">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <Form.Item name="avatar" noStyle>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader !w-36 !h-36 !rounded-full overflow-hidden border-[6px] border-white shadow-2xl group-hover:border-indigo-50 transition-all cursor-pointer flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white relative z-10"
                            showUploadList={false}
                            onChange={handleUpload}
                            beforeUpload={() => false}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                        <FiCamera className="text-xl" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wide">Upload</span>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <div className="absolute bottom-2 right-2 z-20">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                            <FiPlus />
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-left">
                    <Badge count="Step 1" className="mb-2 uppercase tracking-widest font-bold !bg-indigo-100 !text-indigo-600 shadow-none px-2 py-1 rounded-md" />
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Personal Information</h2>
                    <p className="text-lg text-slate-500 max-w-lg">Let's start with the basics to establish the patient's identity and contact profile.</p>
                </div>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} xl={16}>
                    <GlassCard title="Identity" icon={<FiUser />} glowColor="indigo" className="h-full">
                        <Row gutter={24}>
                            <Col xs={24} md={8}>
                                <GlowingInput label="First Name" name="firstName" placeholder="e.g. Jonathan" rules={[{ required: true }]} />
                            </Col>
                            <Col xs={24} md={8}>
                                <GlowingInput label="Middle Name" name="middleName" placeholder="e.g. Lee" />
                            </Col>
                            <Col xs={24} md={8}>
                                <GlowingInput label="Last Name" name="lastName" placeholder="e.g. Doe" rules={[{ required: true }]} />
                            </Col>
                            <Col xs={24} md={12}>
                                <GlowingInput label="Date of Birth" name="dob" type="date" />
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label={<span className="font-semibold text-slate-600 ml-1">Gender</span>} name="gender" className="mb-6">
                                    <Radio.Group className="w-full">
                                        <div className="grid grid-cols-3 gap-4">
                                            <Radio.Button value="male" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                                <SelectionTile value="male" label="Male" icon={<BsGenderMale />} color="blue" />
                                            </Radio.Button>
                                            <Radio.Button value="female" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                                <SelectionTile value="female" label="Female" icon={<BsGenderFemale />} color="rose" />
                                            </Radio.Button>
                                            <Radio.Button value="other" className="!w-full !h-full !p-0 !border-0 !bg-transparent">
                                                <SelectionTile value="other" label="Other" icon={<BsGenderTrans />} color="purple" />
                                            </Radio.Button>
                                        </div>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label={<span className="font-semibold text-slate-600 ml-1">Blood Group</span>} name="bloodGroup" className="mb-0">
                            <Radio.Group className="w-full">
                                <div className="flex flex-wrap gap-3">
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                        <Radio.Button
                                            key={bg}
                                            value={bg}
                                            className="!rounded-xl !border-0 !bg-slate-50 !px-4 !h-10 !flex !items-center !justify-center !font-bold !text-slate-500 hover:!bg-indigo-50 hover:!text-indigo-600 peer-checked:!bg-indigo-600 peer-checked:!text-white shadow-sm transition-all"
                                        >
                                            {bg}
                                        </Radio.Button>
                                    ))}
                                </div>
                            </Radio.Group>
                        </Form.Item>
                    </GlassCard>
                </Col>

                <Col xs={24} xl={8}>
                    <GlassCard title="Contact" icon={<FiPhone />} glowColor="emerald" className="h-full" delay={1}>
                        <GlowingInput label="Phone Number" name="phone" placeholder="(555) 123-4567" prefix={<span className="text-slate-400 font-bold ml-1">+1</span>} rules={[{ required: true }]} />
                        <GlowingInput label="Email Address" name="email" placeholder="john@example.com" prefix={<FiMail className="text-slate-400 ml-1" />} />
                        <div className="my-6 h-px bg-emerald-100"></div>
                        <GlowingInput label="Street Address" name="address" type="textarea" placeholder="123 Main St, Apt 4B" rows={2} />
                        <Row gutter={16}>
                            <Col span={12}><GlowingInput label="City" name="city" placeholder="New York" /></Col>
                            <Col span={12}><GlowingInput label="Zip Code" name="zip" placeholder="10001" /></Col>
                        </Row>
                    </GlassCard>
                </Col>
            </Row>
        </div>
    );
};

export default StepBasicDetails;
