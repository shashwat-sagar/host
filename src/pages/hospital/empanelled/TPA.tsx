import { useEffect, useState } from "react";
import { CheckboxModal, Heading, MasterTable } from "../../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getHospitalEmpanelledDetail,
    getHospitalEmpanelledDetailById,
    getHospitalEmpanelledList,
} from "../../../services/api";
import { Checkbox, Form } from "antd";
import { useAuthStore } from "../../../store/auth.store";
import { ColumnsType } from "antd/es/table";

const empaneledTypeId = 58;
const type = "TPA";

const fetchTPAList = async (t: string) => {
    const { data } = await getHospitalEmpanelledList(t);
    return data;
};

const fetchTPADetail = async (hospitalRegNo: any, typeId: number) => {
    const { data } = await getHospitalEmpanelledDetail(hospitalRegNo, typeId);
    return data?.table;
};

const fetchTPADetailById = async (hospitalRegNo: any, id: any) => {
    const { data } = await getHospitalEmpanelledDetailById(hospitalRegNo, empaneledTypeId, id);
    return data?.table[0];
};

const TPA = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState<any>(null);
    const { user } = useAuthStore();
    const hospitalRegNo = user?.userId;

    const [modalData, setModalData] = useState({
        empaneledId: "" as string | number,
        empaneledName: "",
        empaneledTypeId: empaneledTypeId,
        empaneledTypeName: "TPA",
    });

    const { data: tpaList, isFetching: tpaListLoading } = useQuery({
        queryKey: ["empanelledTPAList", type],
        queryFn: () => fetchTPAList(type),
        refetchOnWindowFocus: false,
    });

    const { data: tpaDetail, isFetched: tpaDetailFetched } = useQuery({
        queryKey: ["empanelledTPADetail", hospitalRegNo, empaneledTypeId],
        enabled: !!hospitalRegNo,
        queryFn: () => fetchTPADetail(hospitalRegNo, empaneledTypeId),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (tpaDetailFetched && tpaDetail) {
            const initialValues = tpaDetail.reduce((acc: any, item: any) => {
                acc[item?.empaneledId] = true;
                return acc;
            }, {});
            form.setFieldsValue(initialValues);
        }
    }, [tpaDetailFetched, tpaDetail, form]);

    const {
        mutate: fetchDetailById,
        isPending: detailLoading,
        data: detailData,
    } = useMutation({
        mutationFn: (id: any) => fetchTPADetailById(hospitalRegNo, id),
    });

    const handleCheckbox = (record: any) => {
        setSelectedCheckbox(record);
        fetchDetailById(record?.value);

        setModalData({
            empaneledId: record?.value || "",
            empaneledName: record?.name || record?.label || "",
            empaneledTypeId: empaneledTypeId,
            empaneledTypeName: "TPA",
        });
        setOpen(true);
    };

    const columns: ColumnsType<any> = [
        {
            title: "Sr. No",
            align: "center",
            width: 80,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: "TPA Name",
            align: "left",
            render: (_text, record) => (
                <span className="font-semibold text-slate-700">
                    {record?.name || record?.label || "--"}
                </span>
            ),
        },
        {
            title: "Empanelled Status",
            align: "center",
            width: 200,
            render: (_text, record) => (
                <Form.Item
                    style={{ margin: 0 }}
                    name={record?.value}
                    valuePropName="checked"
                    className="mb-0"
                >
                    <Checkbox onChange={() => handleCheckbox(record)} />
                </Form.Item>
            ),
        },
    ];

    return (
        <>
            <Heading title="TPA Empanelment" />
            <div className="p-4 bg-white rounded-xl shadow-sm m-2">
                <Form form={form} layout="vertical">
                    <MasterTable
                        columns={columns}
                        bordered
                        data={tpaList}
                        isLoading={tpaListLoading}
                        rowKey="value"
                        pagination={{ pageSize: 15 }}
                        showExport={false}
                        showSearch={true}
                    />
                </Form>
                <CheckboxModal
                    open={open}
                    setOpen={setOpen}
                    loading={detailLoading}
                    selectedCheckbox={selectedCheckbox}
                    form={form}
                    data={detailData}
                    hospitalRegNo={hospitalRegNo}
                    modalData={modalData}
                />
            </div>
        </>
    );
};

export default TPA;
