import { useEffect } from "react";
import { Form, Input, Row, Col, Radio, Button, message, Spin, Tabs, Card } from "antd";
import { Heading } from "../../components";
import {
    getCashlessBenefitsDetail,
    getOPDService,
    getWaiverService,
    getIPDService,
    submitCashlessService,
} from "../../services/api";
import { useAuthStore } from "../../store/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RiDiscountPercentFill } from "react-icons/ri";

const getOPDServiceApi = async () => {
    const { data } = await getOPDService();
    return data;
};
const getIPDServiceApi = async () => {
    const { data } = await getIPDService();
    return data;
};
const getWaiverServiceApi = async () => {
    const { data } = await getWaiverService();
    return data;
};

const getCashlessBenefitsDetailApi = async ({ queryKey }: any) => {
    const [, userId] = queryKey;
    const { data } = await getCashlessBenefitsDetail(userId);
    return data?.table;
};

const submitCashlessServiceApi = async (payload: any) => {
    const { data } = await submitCashlessService(payload);
    return data;
};

const CashlessService = () => {
    const [form] = Form.useForm();
    const { user } = useAuthStore();
    const userId = user?.userId;

    const { data: OPDServiceList, isFetching: isOpdLoading } = useQuery({
        queryKey: ["getOPDServiceApi"],
        queryFn: getOPDServiceApi,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const { data: IPDServiceList, isFetching: isIpdLoading } = useQuery({
        queryKey: ["getIPDServiceApi"],
        queryFn: getIPDServiceApi,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const { data: WaiverServiceList, isFetching: isWaiverLoading } = useQuery({
        queryKey: ["getWaiverServiceApi"],
        queryFn: getWaiverServiceApi,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const { data: cashlessBenefitData, isFetching: isDetailLoading } = useQuery({
        queryKey: ["getCashlessBenefitsDetailApi", userId],
        queryFn: getCashlessBenefitsDetailApi,
        enabled: !!userId,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    useEffect(() => {
        if (!cashlessBenefitData || cashlessBenefitData.length === 0) return;

        const initialValues: Record<string, any> = {};

        cashlessBenefitData.forEach((item: any) => {
            const key = item.cashlessBenefitsFacilityId?.toString();
            if (!key) return;

            if (item.category === "opdServices") {
                initialValues[key] = { opdServices: item.discountPercent };
            } else if (item.category === "ipdServices") {
                initialValues[key] = { IPDServices: item.discountPercent };
            } else if (item.category === "waiverOffered") {
                initialValues[key] = { WaiverService: item.isWaiver };
            }
        });

        form.setFieldsValue(initialValues);
    }, [cashlessBenefitData, form]);

    const { mutate: submitHospitalProfileMutate, isPending } = useMutation({
        mutationFn: submitCashlessServiceApi,
        onSuccess: (data) => {
            if (data?.status === true) {
                message.success("Cashless Services updated successfully");
            } else {
                message.error("Error updating Cashless Services");
            }
        },
        onError: () => {
            message.error("Error while updating Cashless Services");
        },
    });

    const handleSubmit = (values: any) => {
        if (!cashlessBenefitData) return;

        const opdPayload = cashlessBenefitData
            .filter((item: any) => item.category === "opdServices")
            .map((item: any) => ({
                ...item,
                discountPercent: Number(values[item.cashlessBenefitsFacilityId]?.opdServices || 0),
            }));

        const ipdPayload = cashlessBenefitData
            .filter((item: any) => item.category === "ipdServices")
            .map((item: any) => ({
                ...item,
                discountPercent: Number(values[item.cashlessBenefitsFacilityId]?.IPDServices || 0),
            }));

        const waiverPayload = cashlessBenefitData
            .filter((item: any) => item.category === "waiverOffered")
            .map((item: any) => {
                const updatedWaiver = Number(values[item.cashlessBenefitsFacilityId]?.WaiverService || 0);
                return {
                    ...item,
                    isWaiver: updatedWaiver,
                    isWaiverYesNo: updatedWaiver === 1 ? "Yes" : "No",
                };
            });

        const finalPayload = {
            crud: 1,
            hospitalRegNo: userId,
            bl: [...opdPayload, ...ipdPayload, ...waiverPayload],
        };
        submitHospitalProfileMutate(finalPayload);
    };

    const isOverallFetching = isOpdLoading || isIpdLoading || isWaiverLoading || isDetailLoading;

    return (
        <>
            <Heading title="Cashless Services Configuration" />
            <div className="p-4 bg-white rounded-xl shadow-sm m-2">
                {isOverallFetching ? (
                    <div className="flex justify-center p-20">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            items={[
                                {
                                    key: "1",
                                    label: "OPD Services",
                                    children: (
                                        <div className="pt-6">
                                            <Row gutter={[24, 16]}>
                                                {OPDServiceList?.map((item: any) => (
                                                    <Col xs={24} md={12} lg={8} key={item?.value}>
                                                        <Form.Item
                                                            label={<span className="font-semibold text-slate-700">{item?.name || item?.label}</span>}
                                                            name={[item?.value, "opdServices"]}
                                                            rules={[{ required: true, message: "Required" }]}
                                                        >
                                                            <Input
                                                                placeholder="Discount %"
                                                                size="large"
                                                                prefix={<RiDiscountPercentFill className="text-green-600 mr-2" />}
                                                                suffix="%"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ),
                                },
                                {
                                    key: "2",
                                    label: "IPD Services",
                                    children: (
                                        <div className="pt-6">
                                            <Row gutter={[24, 16]}>
                                                {IPDServiceList?.map((item: any) => (
                                                    <Col xs={24} md={12} lg={8} key={item?.value}>
                                                        <Form.Item
                                                            label={<span className="font-semibold text-slate-700">{item?.name || item?.label}</span>}
                                                            name={[item?.value, "IPDServices"]}
                                                            rules={[{ required: true, message: "Required" }]}
                                                        >
                                                            <Input
                                                                placeholder="Discount %"
                                                                size="large"
                                                                prefix={<RiDiscountPercentFill className="text-blue-600 mr-2" />}
                                                                suffix="%"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ),
                                },
                                {
                                    key: "3",
                                    label: "Waiver Offered",
                                    children: (
                                        <div className="pt-6">
                                            <Row gutter={[24, 16]}>
                                                {WaiverServiceList?.map((item: any) => (
                                                    <Col xs={24} md={12} lg={8} key={item?.value}>
                                                        <Card className="hover:shadow-md transition-shadow">
                                                            <Form.Item
                                                                label={<span className="font-semibold text-slate-700">{item?.name || item?.label}</span>}
                                                                name={[item?.value, "WaiverService"]}
                                                                rules={[{ required: true, message: "Required" }]}
                                                                className="mb-0"
                                                            >
                                                                <Radio.Group buttonStyle="solid" className="w-full">
                                                                    <Radio.Button value={1} className="w-1/2 text-center">Yes</Radio.Button>
                                                                    <Radio.Button value={0} className="w-1/2 text-center">No</Radio.Button>
                                                                </Radio.Group>
                                                            </Form.Item>
                                                        </Card>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    ),
                                },
                            ]}
                        />

                        <div className="flex justify-center mt-12 pb-6">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={isPending}
                                className="px-16 h-12 rounded-full font-bold shadow-lg"
                            >
                                Update Cashless Services
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};

export default CashlessService;
