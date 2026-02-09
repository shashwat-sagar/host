import { Row, Col, Form, Input, Checkbox, Upload } from "antd";
import { FiFileText, FiUpload, FiCheckSquare, FiPenTool, FiCalendar, FiAlertCircle } from "react-icons/fi";
import { SectionHeader } from "./DoctorRegistrationStepper";



const DeclarationItem = ({ children, name, rules }: { children: React.ReactNode, name: string, rules?: any[] }) => (
    <div className="p-4 rounded-xl bg-theme-bg-secondary/20 border border-theme-border/50 hover:bg-theme-bg-secondary/30 transition-all mb-4">
        <Form.Item
            name={name}
            valuePropName="checked"
            rules={rules}
            className="mb-0"
        >
            <Checkbox className="text-sm text-theme-text-secondary leading-relaxed">
                {children}
            </Checkbox>
        </Form.Item>
    </div>
);

// const FileUploadItem = ({ label, name, icon: Icon, multiple = false, accept = "image/*,.pdf" }: { label: string, name: string, icon: any, multiple?: boolean, accept?: string }) => (
//     <Form.Item
//         label={<span className="flex items-center gap-2"><Icon size={14} className="text-primary/70" /> {label}</span>}
//         name={name}
//         valuePropName="fileList"
//         getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
//     >
//         <div className="relative group">
//             <Upload
//                 action="#"
//                 accept={accept}
//                 multiple={multiple}
//                 showUploadList={false}
//                 beforeUpload={() => false}
//                 className="h-12 opacity-0 absolute inset-0 z-10 cursor-pointer"
//             />
//             <div className="h-12 px-4 rounded-xl border-2 border-dashed border-theme-border/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all flex items-center justify-between text-theme-text-secondary">
//                 <span className="text-sm truncate">Click to upload or drag & drop</span>
//                 <FiUpload className="text-primary" />
//             </div>
//         </div>
//     </Form.Item>
// );


const FileUploadItem = ({
  label,
  name,
  icon: Icon,
  multiple = false,
  accept = "image/*,.pdf",
}: {
  label: string;
  name: string;
  icon: any;
  multiple?: boolean;
  accept?: string;
}) => (
  <Form.Item
    label={
      <span className="flex items-center gap-2">
        <Icon size={14} className="text-primary/70" /> {label}
      </span>
    }
    name={name}
    valuePropName="fileList"
    getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
  >
    <Upload
      beforeUpload={() => false}
      accept={accept}
      multiple={multiple}
      showUploadList={false}
    >
      <div className="h-12 px-4 rounded-xl border-2 border-dashed border-theme-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-between text-theme-text-secondary cursor-pointer">
        <span className="text-sm truncate">
          Click to upload or drag & drop
        </span>
        <FiUpload className="text-primary" />
      </div>
    </Upload>
  </Form.Item>
);

const DeclarationStep = () => (
    <div className="space-y-12">
        {/* 1. Declarations Section */}
        <section>
            <SectionHeader
                icon={FiCheckSquare}
                title="Declaration & Agreement"
                subtitle="Please read and accept the following terms"
            />
            <div className="grid gap-2">
                <DeclarationItem
                    name="declaration"
                    rules={[{ validator: (_:any, value:any) => value ? Promise.resolve() : Promise.reject(new Error('Required')) }]}
                >
                    I hereby declare that all the information provided by me in this registration form is true, complete, and correct to the best of my knowledge and belief.
                </DeclarationItem>

                <DeclarationItem
                    name="medicalCouncilDeclaration"
                    rules={[{ validator: (_:any, value:any) => value ? Promise.resolve() : Promise.reject(new Error('Required')) }]}
                >
                    I am a registered medical practitioner with a valid registration from the Medical Council of India/State Medical Council and my registration is in good standing.
                </DeclarationItem>

                <DeclarationItem name="criminalDeclaration">
                    I have no criminal records or pending criminal cases against me. I will immediately inform administration of any such developments.
                </DeclarationItem>

                <DeclarationItem name="ethicsDeclaration">
                    I agree to abide by the medical ethics and code of conduct of the hospital and the Medical Council of India.
                </DeclarationItem>

                <DeclarationItem
                    name="confidentialityDeclaration"
                    rules={[{ validator: (_:any, value:any) => value ? Promise.resolve() : Promise.reject(new Error('Required')) }]}
                >
                    I understand that all patient information is confidential and I will maintain the highest standards of data privacy.
                </DeclarationItem>
            </div>
        </section>

        {/* 2. Document Uploads */}
        <section>
            <SectionHeader
                icon={FiUpload}
                title="Document Upload"
                subtitle="High-quality scans of required documents"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24} md={8}>
                    <FileUploadItem label="Passport Size Photo" name="passportPhoto" icon={FiFileText} />
                </Col>
                <Col xs={24} md={8}>
                    <FileUploadItem label="Medical Registration" name="registrationCertificate" icon={FiFileText} />
                </Col>
                <Col xs={24} md={8}>
                    <FileUploadItem label="Qualification Certificates" name="qualificationCertificates" icon={FiFileText} multiple />
                </Col>
                <Col xs={24} md={8}>
                    <FileUploadItem label="ID Proof (Aadhar/PAN)" name="idProof" icon={FiFileText} />
                </Col>
                <Col xs={24} md={8}>
                    <FileUploadItem label="Address Proof" name="addressProof" icon={FiFileText} />
                </Col>
                <Col xs={24} md={8}>
                    <FileUploadItem label="Experience Letters" name="experienceLetters" icon={FiFileText} multiple />
                </Col>
            </Row>
        </section>

        {/* 3. Signature & Final Notes */}
        <section>
            <SectionHeader
                icon={FiPenTool}
                title="Final Confirmation"
                subtitle="Sign and date to complete your registration"
            />
            <Row gutter={[24, 0]}>
                <Col xs={24}>
                    <Form.Item
                        label="Additional Comments or Notes"
                        name="additionalComments"
                        className="mb-8"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Any additional details you'd like to share..."
                            className="rounded-2xl!"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <FileUploadItem label="Upload Digital Signature" name="doctorSignature" icon={FiPenTool} />
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Registration Date"
                        name="signatureDate"
                    >
                        <Input
                            type="date"
                            size="large"
                            className="w-full !rounded-xl h-12"
                            prefix={<FiCalendar className="text-theme-text-secondary/50 mr-2" />}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </section>

        {/* Final Warning */}
        <div className="p-4 rounded-xl bg-yellow-50/10 border border-yellow-500/20 flex gap-4 items-start">
            <FiAlertCircle className="text-yellow-500 shrink-0 mt-1" size={20} />
            <div>
                <h4 className="text-sm font-bold text-yellow-500 m-0">Final Verification</h4>
                <p className="text-xs text-theme-text-secondary m-0 mt-1 leading-relaxed">
                    Once submitted, your registration details will be sent for administrative review. Ensure all uploaded documents are legible and accurate to avoid delays.
                </p>
            </div>
        </div>
    </div>
);

export default DeclarationStep;
