import { useMutation } from "@tanstack/react-query";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Row,
} from "antd";
import { editProviderEmpanelledDetails } from "../services/api";
import { useEffect } from "react";
import dayjs from "dayjs";

const editProviderEmpanelledDetailsData = async (payload: any) => {
    const { data } = await editProviderEmpanelledDetails(payload);
    return data;
};

interface CheckboxModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loading: boolean;
    selectedCheckbox: any;
    form: any;
    data: any;
    hospitalRegNo: string | number | undefined;
    modalData: {
        empaneledId: string | number;
        empaneledName: string;
        empaneledTypeId: number;
        empaneledTypeName: string;
    };
}

const CheckboxModal = ({
    open,
    setOpen,
    selectedCheckbox,
    form,
    data,
    hospitalRegNo,
    modalData,
}: CheckboxModalProps) => {
    const [modalForm] = Form.useForm();

    const { mutate: updateEmpanalledDetailsMutate, isPending } = useMutation({
        mutationKey: ["updateEmpanalledDetailsMutate"],
        mutationFn: editProviderEmpanelledDetailsData,
        onSuccess: (res) => {
            if (res?.status) {
                message.success(res?.message || "Details updated successfully");
                setOpen(false);
            } else {
                message.error(res?.message || "Error updating details");
            }
        },
        onError: () => {
            message.error("Something went wrong");
        },
    });

    const handleClose = () => {
        if (selectedCheckbox && !modalForm.isFieldsTouched()) {
            form.setFieldsValue({ [selectedCheckbox?.value]: false });
        }
        setOpen(false);
    };

    const onFinish = (values: any) => {
        const payload = {
            crud: 1,
            providerName: values.providerName,
            fromDate: dayjs(values.fromDate).format("DD-MM-YYYY"),
            toDate: dayjs(values.toDate).format("DD-MM-YYYY"),
            hospitalRegNo: hospitalRegNo,
            empaneledId: modalData?.empaneledId,
            empaneledName: modalData?.empaneledName,
            empaneledTypeId: modalData?.empaneledTypeId,
            empaneledTypeName: modalData?.empaneledTypeName,
        };
        updateEmpanalledDetailsMutate(payload);
    };

    useEffect(() => {
        if (open && data) {
            modalForm.setFieldsValue({
                providerName: data?.providerName,
                fromDate: data?.fromDate ? dayjs(data?.fromDate, "DD/MM/YYYY") : null,
                toDate: data?.toDate ? dayjs(data?.toDate, "DD/MM/YYYY") : null,
            });
        } else if (open) {
            modalForm.resetFields();
        }
    }, [open, data, modalForm]);

    return (
        <Modal
            title={`Edit ${modalData?.empaneledTypeName} Details`}
            open={open}
            footer={null}
            onCancel={handleClose}
            destroyOnClose
            width={600}
            className="rounded-xl overflow-hidden"
        >
            <Form layout="vertical" form={modalForm} onFinish={onFinish} className="pt-4">
                <Form.Item
                    label={<span className="font-semibold text-slate-700">Provider Number / ID</span>}
                    name="providerName"
                    rules={[{ required: true, message: "Please enter provider number" }]}
                >
                    <Input placeholder="Enter Provider Number" size="large" className="rounded-lg" />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={<span className="font-semibold text-slate-700">Valid From</span>}
                            name="fromDate"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <DatePicker
                                size="large"
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                className="rounded-lg"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={<span className="font-semibold text-slate-700">Valid To</span>}
                            name="toDate"
                            rules={[{ required: true, message: "Required" }]}
                        >
                            <DatePicker
                                size="large"
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                                className="rounded-lg"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex justify-center mt-8 pb-2">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        loading={isPending}
                        className="px-12 h-11 rounded-full font-bold shadow-md"
                    >
                        Update Details
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default CheckboxModal;
