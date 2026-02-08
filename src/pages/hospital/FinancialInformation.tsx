import { useEffect } from "react";
import { Button, Col, Form, Input, message, Row, Select, Spin } from "antd";
import {
    getFinancialInformation,
    updateFinancialInformation,
} from "../../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
import { Heading } from "../../components";

const accountTypeData = [
    { label: "Saving Account", value: 1 },
    { label: "Current Account", value: 2 },
    { label: "Fixed Account", value: 3 },
];

const getFinancialInformationData = async (hospitalRegNo: any) => {
    const { data } = await getFinancialInformation(hospitalRegNo);
    return data?.table[0];
};

const updateFinancialInformationData = async (data: any) => {
    const { data: response } = await updateFinancialInformation(data);
    return response;
};

const FinancialInformation = () => {
    const [form] = Form.useForm();
    const { user } = useAuthStore();
    const hospitalRegNo = user?.userId;

    const {
        data: financialInformationData,
        isFetched,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["financialInformationData", hospitalRegNo],
        queryFn: () => getFinancialInformationData(hospitalRegNo),
        enabled: !!hospitalRegNo,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isFetched && financialInformationData) {
            form.setFieldsValue({
                accountNumber: financialInformationData?.accountNumber,
                beneficiaryName: financialInformationData?.beneficiaryName,
                accountType: accountTypeData.find(
                    (item) => item.value === financialInformationData?.accountTypeId
                ),
                bankName: financialInformationData?.bankName,
                bankAddress: financialInformationData?.bankAddress,
                ifscCode: financialInformationData?.ifscCode,
                panNo: financialInformationData?.panNo,
                nameOnPAN: financialInformationData?.nameOnPAN,
            });
        }
    }, [isFetched, financialInformationData, form]);

    if (error) {
        message.error("Error fetching financial information");
    }

    const { mutate: updateFinancialInformationMutate, isPending } = useMutation({
        mutationFn: updateFinancialInformationData,
        onSuccess: (data) => {
            if (data?.status === true) {
                message.success("Financial Information updated successfully");
            } else {
                message.error("Error updating financial information");
            }
        },
        onError: () => {
            message.error("Error updating financial information");
        },
    });

    const onFinish = (values: any) => {
        const payload = {
            crud: 1,
            hospitalRegNo: hospitalRegNo,
            bl: [
                {
                    accountNumber: values?.accountNumber,
                    beneficiaryName: values?.beneficiaryName,
                    accountTypeId: values?.accountType?.value || values?.accountType,
                    accountTypeName: accountTypeData.find(a => a.value === (values?.accountType?.value || values?.accountType))?.label,
                    bankName: values?.bankName,
                    bankAddress: values?.bankAddress,
                    ifscCode: values?.ifscCode,
                    panNo: values?.panNo,
                    nameOnPAN: values?.nameOnPAN,
                },
            ],
        };
        updateFinancialInformationMutate(payload);
    };

    return (
        <>
            <Heading title={"Financial Information"} />
            <div className="p-4 bg-white rounded-xl shadow-sm m-2">
                {isFetching ? (
                    <div className="flex justify-center p-20">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Account Number"
                                    name="accountNumber"
                                    rules={[
                                        { required: true, message: "Required" },
                                        { pattern: /^\d{9,18}$/, message: "9 to 18 digits" },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="Account Number" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Beneficiary Name"
                                    name="beneficiaryName"
                                    rules={[
                                        { required: true, message: "Required" },
                                        { pattern: /^[a-zA-Z\s]+$/, message: "Letters only" },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="Beneficiary Name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Account Type"
                                    name="accountType"
                                    rules={[{ required: true, message: "Required" }]}
                                    hasFeedback
                                >
                                    <Select
                                        size="large"
                                        placeholder="Select Type"
                                        options={accountTypeData}
                                        showSearch
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Bank Name"
                                    name="bankName"
                                    rules={[{ required: true, message: "Required" }]}
                                    hasFeedback
                                >
                                    <Input placeholder="Bank Name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={16}>
                                <Form.Item
                                    label="Bank Address"
                                    name="bankAddress"
                                    rules={[{ required: true, message: "Required" }]}
                                    hasFeedback
                                >
                                    <Input placeholder="Bank Address" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="IFSC Code"
                                    name="ifscCode"
                                    rules={[
                                        { required: true, message: "Required" },
                                        { pattern: /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/, message: "Invalid format" },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="IFSC Code" size="large" className="uppercase" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="PAN Number"
                                    name="panNo"
                                    rules={[
                                        { required: true, message: "Required" },
                                        { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: "Invalid format" },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="PAN Number" size="large" className="uppercase" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Form.Item
                                    label="Name as per PAN"
                                    name="nameOnPAN"
                                    rules={[
                                        { required: true, message: "Required" },
                                        { pattern: /^[a-zA-Z\s]+$/, message: "Letters only" },
                                    ]}
                                    hasFeedback
                                >
                                    <Input placeholder="Name on PAN" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="flex justify-center mt-12 pb-6">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={isPending}
                                className="px-16 h-12 rounded-full font-bold shadow-lg"
                            >
                                Submit Financial Info
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};

export default FinancialInformation;
