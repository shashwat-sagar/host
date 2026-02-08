import {
  Button,
  Form,
  Input,
  Row,
  Col,
  message,
  Select,
  Divider,
  DatePicker,
  Radio,
  Spin,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getState,
  getCityByState,
  getNatureEntity,
  getProviderType,
  getHospitalInfoById,
  saveHospitalUpdate,
} from "../../services/api";
import { useAuthStore } from "../../store/auth.store";
import {
  FaMobileAlt,
  FaUserCheck,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";

import { Heading, SubHeading } from "../../components/Heading";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import dayjs from "dayjs";

const getstateApi = async () => {
  const { data } = await getState();
  return data;
};
const getCityByStateApi = async (stateId: any) => {
  const { data } = await getCityByState(stateId);
  return data;
};
const getNatureEntityApi = async () => {
  const { data } = await getNatureEntity();
  return data;
};
const getProviderTypeApi = async () => {
  const { data } = await getProviderType();
  return data;
};

const getHospitalInfoByIdApi = async ({ queryKey }: any) => {
  const [, userId, hospitalReg] = queryKey;
  console.log("hospitalId", userId, hospitalReg);
  if (hospitalReg) {
    const { data } = await getHospitalInfoById(hospitalReg);
    return data?.dataset?.maincontact;
  } else {
    const { data } = await getHospitalInfoById(userId);
    return data?.dataset?.maincontact;
  }
};

const saveHospitalUpdateApi = async (payload: any) => {
  console.log("payload", payload);
  const { data } = await saveHospitalUpdate(payload);
  return data;
};

const HospitalProfile = () => {
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  const userId = user?.userId;
  const navigate = useNavigate();
  const location = useLocation();
  const hospitalReg = location.state?.hospitalId;
  console.log("user", user);
  console.log("hospitalReg", hospitalReg);

  const { data: stateData } = useQuery({
    queryKey: ["getstateApi"],
    queryFn: getstateApi,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: entityData } = useQuery({
    queryKey: ["getNatureEntityApi"],
    queryFn: getNatureEntityApi,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: providerTypeData } = useQuery({
    queryKey: ["getProviderTypeApi"],
    queryFn: getProviderTypeApi,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { data: hospitalPrefilled, isFetching } = useQuery({
    queryKey: ["getHospitalInfoByIdApi", userId, hospitalReg],
    queryFn: getHospitalInfoByIdApi,
    enabled: hospitalReg ? !!hospitalReg : !!userId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const { mutate: cityMutate, data: cityData } = useMutation({
    mutationFn: getCityByStateApi,
  });

  useEffect(() => {
    if (hospitalPrefilled?.length > 0) {
      const CEOContact = hospitalPrefilled.find(
        (item: any) => item.designationId === 1,
      );
      const MOUContact = hospitalPrefilled.find(
        (item: any) => item.designationId === 2,
      );
      const MarketingContact = hospitalPrefilled.find(
        (item: any) => item.designationId === 3,
      );
      const TAPContact = hospitalPrefilled.find(
        (item: any) => item.designationId === 4,
      );

      if (CEOContact) {
        form.setFieldsValue({
          OrganisationPersonName: CEOContact.contactPersonName,
          OrganisationMobile: CEOContact.mobileNo,
          OrganisationEmail: CEOContact.emailId,
        });
      }
      if (MOUContact) {
        form.setFieldsValue({
          MOUPersonName: MOUContact.contactPersonName,
          MOUMobile: MOUContact.mobileNo,
          MOUEmail: MOUContact.emailId,
        });
      }
      if (MarketingContact) {
        form.setFieldsValue({
          MarketingPersonName: MarketingContact.contactPersonName,
          MarketingMobile: MarketingContact.mobileNo,
          MarketingEmail: MarketingContact.emailId,
        });
      }
      if (TAPContact) {
        form.setFieldsValue({
          TAPPersonName: TAPContact.contactPersonName,
          TAPMobile: TAPContact.mobileNo,
          TAPEmail: TAPContact.emailId,
        });
      }
    }
  }, [hospitalPrefilled, form]);

  const { mutate: submitMutate, isPending: submitPending } = useMutation({
    mutationKey: ["saveHospitalUpdateApi"],
    mutationFn: saveHospitalUpdateApi,
    onSuccess: (data) => {
      if (data?.status === true) {
        message.success(data?.message || "profile updated successfully");
        form.resetFields();
        navigate("/auth/dashboard");
      } else {
        message.error(data?.message || "Unable to update profile!");
      }
    },
    onError: (error: any) => {
      message.error(error.message || "Something went wrong!");
    },
  });

  const handleSubmit = (values: any) => {
    const payload = {
      blMC: [
        {
          designationId: 1,
          designationName: "Head of the Organisation/CEO",
          contactPersonName: values?.OrganisationPersonName,
          mobileNo: values?.OrganisationMobile,
          emailId: values?.OrganisationEmail,
        },
        {
          designationId: 2,
          designationName: "MOU Signing Authority",
          contactPersonName: values?.MOUPersonName,
          mobileNo: values?.MOUMobile,
          emailId: values?.MOUEmail,
        },
        {
          designationId: 3,
          designationName: "Marketing",
          contactPersonName: values?.MarketingPersonName,
          mobileNo: values?.MarketingMobile,
          emailId: values?.MarketingEmail,
        },
        {
          designationId: 4,
          designationName: "TAP Desk",
          contactPersonName: values?.TAPPersonName,
          mobileNo: values?.TAPMobile,
          emailId: values?.TAPEmail,
        },
      ],
      rohiniId: values?.RohiniId || null,
      licenseExpiryDate: values?.ExpiryDate
        ? dayjs(values.ExpiryDate).format("YYYY-MM-DD")
        : null,
      nabhCertificationLevel: values?.NABHCertification || null,
      registeredWith: values?.RegisteredWith || null,
      anyOtherCertification: values?.OtherCertification || null,
      stateId: values?.state || null,
      cityId: values?.city || null,
      pinCode: values?.pinCode || null,
      landMark: values?.landmark || null,
      phoneNumber: values?.phoneNo || null,
      fax: values?.fax || null,
      latitude: values?.latitude || null,
      longitude: values?.longitude || null,
      website: values?.website || null,
      typeOfProviderId: values?.providerType || null,
      natureOfEntityId: values?.natureEntity || null,
      isCovid: values?.Covid !== undefined ? values.Covid : null,
      crud: 3,
      hospitalRegNo: userId || null,
    };
    submitMutate(payload);
  };

  return (
    <>
      <Heading title="Hospital Profile" />
      <div className="p-4 bg-white rounded-xl shadow-sm m-2">
        {isFetching ? (
          <div className="flex justify-center p-20">
            <Spin size="large" />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            size="large"
            onFinish={handleSubmit}
            disabled={hospitalReg}
          >
            <SubHeading title="Contact Person Details" />

            <div className="mt-10">
              <Row gutter={[24, 16]}>
                <Col span={24}>
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
                    Head of the Organisation / CEO
                  </h3>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Contact Person Name"
                    name="OrganisationPersonName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter contact person name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Contact Person Name"
                      prefix={<FaUserTie className="text-blue-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mobile no"
                    name="OrganisationMobile"
                    rules={[
                      { required: true, message: "Please enter mobile number" },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Please enter 10 digit valid mobile number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mobile no"
                      prefix={<FaMobileAlt className="text-orange-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Email Id"
                    name="OrganisationEmail"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Please enter valid email" },
                    ]}
                  >
                    <Input
                      placeholder="Email Id"
                      prefix={
                        <MdOutlineEmail className="text-green-500 mr-2" />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Divider className="my-8" />

              <Row gutter={[24, 16]}>
                <Col span={24}>
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
                    MOU Signing Authority
                  </h3>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Contact Person Name"
                    name="MOUPersonName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter contact person name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Contact Person Name"
                      prefix={<FaUserTie className="text-blue-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mobile No."
                    name="MOUMobile"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Mobile Number!",
                      },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Please enter 10 digit valid mobile number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mobile no"
                      prefix={<FaMobileAlt className="text-orange-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Email Id"
                    name="MOUEmail"
                    rules={[{ required: true, message: "Please enter Email!" }]}
                  >
                    <Input
                      placeholder="Email Id"
                      prefix={
                        <MdOutlineEmail className="text-green-500 mr-2" />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Divider className="my-8" />

                            <Row gutter={[24, 16]}>
                                <Col span={24}>
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
                                        TAP Desk
                                    </h3>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Contact Person Name"
                                        name="TAPPersonName"
                                        rules={[{ required: true, message: "Please enter Contact Person Name" }]}
                                    >
                                        <Input placeholder="Contact Person Name" prefix={<FaUserTie className="text-blue-500 mr-2" />} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Mobile No."
                                        name="TAPMobile"
                                        rules={[
                                            { required: true, message: "Please enter mobile number" },
                                            { pattern: /^[6-9]\d{9}$/, message: "Please enter 10 digit valid mobile number" },
                                        ]}
                                    >
                                        <Input placeholder="Mobile no" prefix={<FaMobileAlt className="text-orange-500 mr-2" />} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Email Id"
                                        name="TAPEmail"
                                        rules={[
                                            { required: true, message: "Please enter Email Id" },
                                            { type: "email", message: "Please enter valid email" },
                                        ]}
                                    >
                                        <Input placeholder="Email Id" prefix={<MdOutlineEmail className="text-green-500 mr-2" />} />
                                    </Form.Item>
                                </Col>
                            </Row> */}

              <Divider className="my-8" />

              <Row gutter={[24, 16]}>
                <Col span={24}>
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
                    Hospital Registration Details
                  </h3>
                </Col>
             
              </Row>

              <Row gutter={[24, 16]} className="mt-8">
                {/* <Col xs={24} md={8}>
                  <Form.Item
                    label="Hospital Rohini Id"
                    name="RohiniId"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Hospital Rohini Id",
                      },
                    ]}
                  >
                    <Input placeholder="Hospital Rohini Id" />
                  </Form.Item>
                </Col> */}
                 <Col xs={24} md={8}>
                  <Form.Item
                    label="Hospital Registered With"
                    name="RegisteredWith"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Hospital Registered With",
                      },
                    ]}
                  >
                    <Input placeholder="Hospital Registered With" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Expiry Date"
                    name="ExpiryDate"
                    rules={[
                      { required: true, message: "Please enter Expiry Date" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label=" Certified With"
                    name="NABHCertification"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Certified With",
                      },
                    ]}
                  >
                    <Input placeholder="Certified With" />
                  </Form.Item>
                </Col>
               
                {/* <Col xs={24} md={8}>
                  <Form.Item
                    label="Other Certication"
                    name="OtherCertification"
                  >
                    <Input placeholder="Other Certication" />
                  </Form.Item>
                </Col> */}
              </Row>
            </div>

            <Divider className="my-10" />
            {/* <SubHeading title="Hospital Additional Info" /> */}
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
              Hospital Contact Details
            </h3>
            <div className="mt-6">
              <Row gutter={[24, 16]}>
                   <Col xs={24} md={8}>
                  <Form.Item
                    label="Contact Person Name"
                    name="MarketingPersonName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Contact Person Name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Contact Person Name"
                      prefix={<FaUserTie className="text-blue-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Mobile No."
                    name="MarketingMobile"
                    rules={[
                      { required: true, message: "Please enter mobile number" },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Please enter 10 digit valid mobile number",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mobile no"
                      prefix={<FaMobileAlt className="text-orange-500 mr-2" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Email Id"
                    name="MarketingEmail"
                    rules={[
                      { required: true, message: "Please enter Email Id" },
                      { type: "email", message: "Please enter valid email" },
                    ]}
                  >
                    <Input
                      placeholder="Email Id"
                      prefix={
                        <MdOutlineEmail className="text-green-500 mr-2" />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="State" name="state">
                    <Select
                      options={stateData}
                      placeholder="Select State"
                      onChange={(value) => {
                        form.setFieldsValue({ city: undefined });
                        cityMutate(value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="City" name="city">
                    <Select options={cityData} placeholder="Select City" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Pin"
                    name="pinCode"
                    rules={[
                      {
                        pattern: /^[1-9][0-9]{5}$/,
                        message: "Please enter a valid 6-digit PIN code",
                      },
                    ]}
                  >
                    <Input placeholder="Pin" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Landmark" name="landmark">
                    <Input placeholder="Landmark" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Phone No."
                    name="phoneNo"
                    rules={[
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Please enter 10 digit valid mobile number",
                      },
                    ]}
                  >
                    <Input placeholder="Phone No." />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Fax" name="fax">
                    <Input placeholder="Fax" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Latitude" name="latitude">
                    <Input placeholder="Latitude" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Longitude" name="longitude">
                    <Input placeholder="Longitude" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item label="Website" name="website">
                    <Input placeholder="Website" />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} md={6}>
                                    <Form.Item label="Type of Provider" name="providerType">
                                        <Select options={providerTypeData} placeholder="Select Provider Type" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={6}>
                                    <Form.Item label="Nature of Entity" name="natureEntity">
                                        <Select options={entityData} placeholder="Select Entity" />
                                    </Form.Item>
                                </Col> */}
                {/* <Col xs={24} md={6}>
                                    <Form.Item label="Is Covid Treatment Available" name="Covid">
                                        <Radio.Group>
                                            <Radio value={true}>Yes</Radio>
                                            <Radio value={false}>No</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col> */}
              </Row>
            </div>

            <div className="flex justify-center mt-12 pb-8">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={submitPending}
                className="px-12 h-12 rounded-full font-bold shadow-lg"
              >
                Update Profile
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default HospitalProfile;
