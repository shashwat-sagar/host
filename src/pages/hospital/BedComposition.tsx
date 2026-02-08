import { Button, Col, Form, Input, message, Row, Skeleton, Space } from "antd";
import {
    updateBedComposition,
    getBedComposition,
    getBedCompositionList,
} from "../../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";
import { Heading } from "../../components/Heading";
import { IoBed } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

const getBedCompositionListData = async () => {
    const { data } = await getBedCompositionList();
    return data;
};

const getBedCompositionData = async (hospitalRegNo: any) => {
    const { data } = await getBedComposition(hospitalRegNo);
    return data?.table;
};

const updateBedCompositionData = async (data: any) => {
    const { data: response } = await updateBedComposition(data);
    return response;
};

const BedComposition = () => {
    const [form] = Form.useForm();
    const { user } = useAuthStore();
    const hospitalRegNo = user?.userId;

    const {
        data: bedCompositionList,
        isFetched,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["getBedCompositionList"],
        queryFn: getBedCompositionListData,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const {
        data: bedCompositionData,
        isFetching: bedCompositionFetching,
    } = useQuery({
        queryKey: ["getBedComposition", hospitalRegNo],
        queryFn: () => getBedCompositionData(hospitalRegNo),
        enabled: !!hospitalRegNo,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isFetched && bedCompositionData) {
            const initialValues: any = {};
            bedCompositionData?.forEach((item: any) => {
                const key = item?.bedCompositionId?.toString();
                if (key) {
                    initialValues[key] = {
                        noOfBeds: item?.noOfBeds,
                        rentPerDay: item?.rentPerDay,
                    };
                }
            });
            form.setFieldsValue(initialValues);
        }
    }, [isFetched, bedCompositionData, form]);

    if (error) {
        message.error("Error fetching bed composition");
    }

    const {
        mutate: updateBedCompositionMutate,
        isPending: bedCompositionUpdatePending,
    } = useMutation({
        mutationFn: updateBedCompositionData,
        onSuccess: (data) => {
            if (data?.status === true) {
                message.success(data?.message || "Bed Composition updated successfully");
            } else {
                message.error(data?.message || "Error updating Bed Composition");
            }
        },
        onError: () => {
            message.error("Error updating Bed Composition");
        },
    });

    const onFinish = (values: any) => {
        const payload = bedCompositionList
            ?.filter((item: any) => values[item.value])
            ?.map((item: any) => {
                const { noOfBeds, rentPerDay } = values[item.value] || {};
                return {
                    bedCompositionId: parseInt(item.value),
                    hospitalRegNo: hospitalRegNo,
                    noOfBeds: Number(noOfBeds),
                    rentPerDay: Number(rentPerDay),
                    nameEnglish: item.label || item.name || "",
                };
            });

        const completePayload = {
            clientIp: user?.clientIP,
            crud: 1,
            hospitalRegNo: hospitalRegNo,
            userId: hospitalRegNo,
            bl: payload,
        };
        updateBedCompositionMutate(completePayload);
    };

    return (
        <>
            <Heading title={"Bed Composition"} />
            <div className="p-4 bg-white rounded-xl shadow-sm m-2">
                {isFetching ? (
                    <Row gutter={[24, 24]}>
                        {[...Array(6)].map((_, index) => (
                            <Col xs={24} md={12} key={index}>
                                <div className="flex flex-col gap-2">
                                    <Skeleton.Button active block style={{ height: 20, width: 120 }} />
                                    <Skeleton.Input active block style={{ height: 40 }} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row gutter={[24, 16]}>
                            {bedCompositionList?.map((item: any) => (
                                <Col xs={24} md={12} key={item?.value}>
                                    <Form.Item label={<span className="font-semibold text-slate-700">{item?.name || item?.label}</span>}>
                                        {!bedCompositionFetching ? (
                                            <Space.Compact block size="large">
                                                <Form.Item
                                                    name={[item?.value, "noOfBeds"]}
                                                    noStyle
                                                    rules={[{ required: true, message: "Required" }]}
                                                >
                                                    <Input
                                                        placeholder="No. of Beds"
                                                        prefix={<IoBed className="text-blue-500 mr-2" />}
                                                        className="rounded-l-lg"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[item?.value, "rentPerDay"]}
                                                    noStyle
                                                    rules={[{ required: true, message: "Required" }]}
                                                >
                                                    <Input
                                                        placeholder="Rent / Day"
                                                        prefix={<FaRupeeSign className="text-green-600 mr-1 text-xs" />}
                                                        className="rounded-r-lg"
                                                    />
                                                </Form.Item>
                                            </Space.Compact>
                                        ) : (
                                            <Skeleton.Input active block size="large" />
                                        )}
                                    </Form.Item>
                                </Col>
                            ))}
                        </Row>

                        <div className="flex justify-center mt-12 pb-6">
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={bedCompositionUpdatePending}
                                className="px-16 h-12 rounded-full font-bold shadow-lg"
                            >
                                Update Bed Composition
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};

export default BedComposition;
