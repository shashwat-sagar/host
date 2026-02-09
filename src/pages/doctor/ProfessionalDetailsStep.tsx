import { Row, Col, Form, Input, Select, DatePicker, InputNumber, Button} from "antd";
import {
  FiAward,
  FiBook,
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiHash,
  FiMapPin,
  FiSearch
} from "react-icons/fi";
import { SectionHeader } from "./DoctorRegistrationStepper";


const ProfessionalDetailsStep = () => {
  return (
    <div className="space-y-12">
      {/* 1. Medical Council Registration */}
      <section>
        <SectionHeader
          icon={FiAward}
          title="Medical Council Registration"
          subtitle="Official licensure and registration details"
        />
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Medical Council Name"
              name="medicalCouncilName"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input prefix={<FiSearch className="text-theme-text-secondary/50" />} placeholder="e.g. Karnataka Medical Council" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input prefix={<FiHash className="text-theme-text-secondary/50" />} placeholder="e.g. KMC-123456" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Date"
              name="registrationDate"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker prefix={<FiCalendar className="text-theme-text-secondary/50 mr-2" />} size="large" className="w-full" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Renewal Year"
              name="renewalYear"
            >
              <InputNumber
                min={1900}
                max={2100}
                placeholder="YYYY"
                size="large"
                className="w-full!"
                prefix={<FiCalendar className="text-theme-text-secondary/50" />}
              />
            </Form.Item>
          </Col>
        </Row>
      </section>

      {/* 2. Academic Qualifications */}
      <section>
        <SectionHeader
          icon={FiBook}
          title="Academic Qualifications"
          subtitle="List your medical degrees and specializations"
        />
        <Form.List name="qualifications" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.key} className="p-6 rounded-2xl bg-theme-bg-secondary/20 border border-theme-border/50 relative group transition-all hover:bg-theme-bg-secondary/30">
                  {fields.length > 1 && (
                    <button
                      onClick={() => remove(field.name)}
                      className="absolute top-4 right-4 p-2 text-theme-text-secondary hover:text-red-500 hover:bg-red-50/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-theme-text-secondary uppercase tracking-wider">Qualification Record</span>
                  </div>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        {...field}
                        label="Qualification"
                        name={[field.name, "primaryQualification"]}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <Select
                          size="large"
                          placeholder="Select"
                          options={[
                            { label: "MBBS", value: "MBBS" },
                            { label: "BDS", value: "BDS" },
                            { label: "BAMS", value: "BAMS" },
                            { label: "BHMS", value: "BHMS" },
                            { label: "MD", value: "MD" },
                            { label: "MS", value: "MS" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        {...field}
                        label="Specialization"
                        name={[field.name, "specialization"]}
                      >
                        <Select
                          mode="multiple"
                          size="large"
                          placeholder="Search & Select Specializations"
                          options={[
                            { label: "Cardiology", value: "Cardiology" },
                            { label: "Neurology", value: "Neurology" },
                            { label: "Orthopedics", value: "Orthopedics" },
                            { label: "Pediatrics", value: "Pediatrics" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        {...field}
                        label="Passing Year"
                        name={[field.name, "yearOfGraduation"]}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <InputNumber min={1950} max={2100} placeholder="YYYY" size="large" className="w-full" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={16}>
                      <Form.Item
                        {...field}
                        label="Medical College / University"
                        name={[field.name, "medicalCollege"]}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <Input prefix={<FiMapPin className="text-theme-text-secondary/50" />} placeholder="Full college name" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        {...field}
                        label="Remarks"
                        name={[field.name, "remarks"]}
                        className="mb-0"
                      >
                        <Input.TextArea rows={2} placeholder="Any additional details..." className="rounded-xl!" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<FiPlus className="mr-2" />}
                className="h-12 rounded-xl border-dashed border-2 hover:border-primary hover:text-primary transition-all flex items-center justify-center font-medium"
              >
                Add Another Qualification
              </Button>
            </div>
          )}
        </Form.List>
      </section>

      {/* 3. Professional Experience */}
      <section>
        <SectionHeader
          icon={FiBriefcase}
          title="Professional Experience"
          subtitle="Document your work history and expertise"
        />
        <Form.List name="professionalExperience" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.key} className="p-6 rounded-2xl bg-theme-bg-secondary/20 border border-theme-border/50 relative group transition-all hover:bg-theme-bg-secondary/30">
                  {fields.length > 1 && (
                    <button
                      onClick={() => remove(field.name)}
                      className="absolute top-4 right-4 p-2 text-theme-text-secondary hover:text-red-500 hover:bg-red-50/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-xs font-semibold text-theme-text-secondary uppercase tracking-wider">Experience Record</span>
                  </div>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} md={6}>
                      <Form.Item
                        {...field}
                        label="Years of Exp."
                        name={[field.name, "totalExperience"]}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <InputNumber min={0} placeholder="Years" size="large" className="w-full!" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={9}>
                      <Form.Item
                        {...field}
                        label="Designation"
                        name={[field.name, "currentDesignation"]}
                      >
                        <Input placeholder="e.g. Senior Consultant" size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={9}>
                      <Form.Item
                        {...field}
                        label="Department"
                        name={[field.name, "department"]}
                        rules={[{ required: true, message: "Required" }]}
                      >
                        <Select
                          size="large"
                          placeholder="Select"
                          options={[
                            { label: "ICU", value: "ICU" },
                            { label: "Cardiology", value: "Cardiology" },
                            { label: "General Medicine", value: "General Medicine" },
                            { label: "Pediatrics", value: "Pediatrics" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<FiPlus className="mr-2" />}
                className="h-12 rounded-xl border-dashed border-2 hover:border-primary hover:text-primary transition-all flex items-center justify-center font-medium"
              >
                Add Work Experience
              </Button>
            </div>
          )}
        </Form.List>
      </section>
    </div>
  );
};

export default ProfessionalDetailsStep;
